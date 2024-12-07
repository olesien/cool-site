import { Input, Button, Modal, Table, TableColumnsType, Checkbox, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import productstyles from "./product.module.scss";
import { useQuery } from "@tanstack/react-query";
import { base_url, getCategories, getProducts, getFilteredProducts, getProductsAddedByAdmin } from "@/services/api";
import Loading from "@/components/Loading";
import ProductModal, { SaveProduct } from "./components/ProductModal";
import { toast } from "react-toastify";
import axios from "axios";
import { Category, SubCategory } from "../categories";
import { useAppContext } from "@/contexts/useAppContext";

import { NavLink, useSearchParams } from "react-router-dom";

export type ProductImages = {
    id: number;
    name: string;
    url: string;
}
export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: ProductImages[];
    sub_category: SubCategory & { category: Pick<Category, "id" | "name" | "link_name"> }
    wishlist: {id: number}[];
}
export default function Products() {
    // Get the user from the context
    const { user } = useAppContext();
    const loggedInUserId = user?.id;

    const defaultFilterQuantity = 1;
    const [searchParams, setSearchParams] = useSearchParams();
    const changePage = (newPage: number) => {
        searchParams.set("page", String(newPage));
        setSearchParams(searchParams);
    }
    const [filterQuantity, setFilterQuantity] = useState(defaultFilterQuantity); // Default quantity filter - the default is set on the button Filter.
    const [filterInputValue, setFilterInputValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [filteredData, setFilteredData] = useState<Product[] | null>(null);
    const [isFiltered, setIsFiltered] = useState(false); 
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const { data, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
    const { data: categories } = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    });

    const saveProduct = async (data: SaveProduct) => {
        setShowAddProduct(false);
        const split = data.category.split("^");
        if (split.length < 2) {
            return toast.error("The category must be selected");
        }
        try {
            const response = await axios.post<string>(
                base_url + '/products/add',
                { ...data, categoryId: Number(split[1]), images: data?.images ?? [] },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch();
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const saveEditProduct = async (data: { old: Product, new: SaveProduct }) => {
        setEditProduct(null);
        const split = data.new.category.split("^");
        if (split.length < 2) {
            return toast.error("The category must be selected");
        }
        try {
            const response = await axios.put<string>(
                base_url + '/products/put/' + data.old.id,
                { ...data.new, categoryId: Number(split[1]), images: data.new?.images ?? [] },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch()
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const deleteItem = async (itemID: number) => {
        try {
            const response = await axios.delete<string>(
                base_url + '/products/delete/' + itemID,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch()
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const handleDeleteProduct = (data: Product) => {
        Modal.confirm({
            title: `Confirm deletion`,
            content: `Are you sure you want to delete the product ${data.name}? Note that all images under this product will also be deleted`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Perform delete action
                console.log('Deleting item with ID:', data.id);
                deleteItem(data.id);
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    }

    // The Input Filter
    const handleFilter = async () => {
        try {
            const filteredProducts = await getFilteredProducts(filterQuantity+1);
            setFilteredData(filteredProducts);
            setIsFiltered(true);
            setIsChecked(false);
        } catch (error) {
            console.error("Error fetching filtered products", error);
        }
    };

    // The filter checkbox - shows products added by admin
    const handleCheckboxChange = async (event: any) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        
        if (checked) {
            // if there is something left in the input field, clear it
            setFilterInputValue("");
            try {
                const filteredProducts = await getProductsAddedByAdmin(loggedInUserId);
                setFilteredData(filteredProducts);
                setIsFiltered(true);
            } catch (error) {
                console.error("Error fetching filtered products", error);
            }
        } else {
            // reset the filter if the box is unchecked
            handleReset();
        }
    };

    const handleReset = () => {
        setFilterInputValue("");
        setFilteredData(null);
        setIsFiltered(false);
        setFilterQuantity(defaultFilterQuantity);
        setIsChecked(false);
    };

    // Get the input value and present the result.
    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilterInputValue(value);
        setFilterQuantity(Number(value));
    };

    // pick the right name based on the applied filter
    const handleTitleOfResultTable = (): string => {
        if (isChecked) {
            return `Products added by me (${filteredData?.length || 0} result/s)`;
        } else if (isFiltered) {
            return `Filtered Products (${filteredData?.length || 0} result/s)`;
        }
        return `All Products (${data?.length || 0} product/s)`;
    };
    


    const columns: TableColumnsType<Product> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', render: (_text, record: Product) => <NavLink to={'/product/' + record.id}>{record.name}</NavLink>},
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Category', dataIndex: 'category_id', render: (_text, record: Product) => <span>{record.sub_category.name} ({record.sub_category.category.name})</span> },
        {
            title: 'Action', key: 'operation', render: (_text, record: Product) => <div className={productstyles.iconContainer}>
                <FontAwesomeIcon
                    title="Edit product"
                    aria-label="Edit product"
                    className={productstyles.addIcon}
                    icon={faEdit}
                    onClick={() => setEditProduct(record)}
                />
                <FontAwesomeIcon
                    title="Remove product"
                    aria-label="Remove product"
                    className={productstyles.deleteIcon}
                    icon={faTrash}
                    onClick={() => handleDeleteProduct(record)}
                /></div>
        },
    ], []);
    return (
        <>       
        <div className="filter-container">
            <div className="max-quantity">
                <h3>Filter by max quantity:</h3>
                <Input
                    type="number"
                    value={filterInputValue}
                    onChange={handleFilterInputChange}
                    placeholder="Quantity"
                    className="quantity-input"

                />
                <Button type="primary" onClick={handleFilter}>
                    Filter
                </Button>
                <Button type="primary" onClick={handleReset}>
                    Reset
                </Button>
            </div>
            <div className="my-products">
                <h3>Added by me:</h3>
                <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                    Show my products
                </Checkbox>
            </div>
        </div>
        <div className="main-header">
            <h2>{handleTitleOfResultTable()}</h2>
            <Button variant="filled" color="primary" onClick={() => setShowAddProduct(true)}><FontAwesomeIcon
                className={productstyles.addIcon}
                icon={faPlus}
                /> 
                New Product
            </Button>
        
        </div>
        {!data || !categories ? <Loading /> : <>
            <Table<Product>
                pagination={
                    ({
                        current: Number(searchParams.get("page") ?? 1),
                        onChange: changePage,
                        position: ["bottomCenter"]
                    })
                }
                rowKey="id"
                columns={columns}
                dataSource={filteredData || data}
            />
            {showAddProduct && <ProductModal categories={categories} title="Add Product" onSave={saveProduct} handleClose={() => setShowAddProduct(false)} />}
            {!!editProduct && <ProductModal categories={categories} title="Edit Product" onSave={(v) => saveEditProduct({ old: editProduct, new: v })} handleClose={() => setEditProduct(null)} initialData={editProduct} />}
            </>
    }


        </>
    )
}
