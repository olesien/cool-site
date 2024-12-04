import { Input, Button, Modal, Table, TableColumnsType, Checkbox, CheckboxProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import productstyles from "./product.module.scss";
import { useQuery } from "@tanstack/react-query";
import { base_url, getCategories, getProducts, getFilteredProducts  } from "@/services/api";
import Loading from "@/components/Loading";
import CategoryModal, { SaveProduct } from "./components/ProductModal";
import { toast } from "react-toastify";
import axios from "axios";
import { Category, SubCategory } from "../categories";
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
}
export default function Products() {
    const [filterQuantity, setFilterQuantity] = useState(2); // Default quantity filter
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

    const saveEditProduct = async (data: { old: Product, new: SaveProduct }) => {
        setEditProduct(null);
        console.log(data);
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

    const handleFilter = async () => {
        try {
            const filteredProducts = await getFilteredProducts(filterQuantity+1);
            setFilteredData(filteredProducts);
            setIsFiltered(true);
        } catch (error) {
            console.error("Error fetching filtered products", error);
        }
    };

    const handleCheckboxChange = async (event: any) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        if (checked) {
            try {
                const filteredProducts = await getFilteredProducts(2);
                setFilteredData(filteredProducts);
                setIsFiltered(true);
            } catch (error) {
                console.error("Error fetching filtered products", error);
            }
        } else {
            handleReset();
            setIsChecked(false);
        }
    };

    const handleReset = () => {
        setFilteredData(null);
        setIsFiltered(false); // Mark the data as not filtered
    };
    


    const columns: TableColumnsType<Product> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Category', dataIndex: 'category_id', render: (_text, record: Product) => <span>{record.sub_category.name} ({record.sub_category.category.name})</span> },
        {
            title: 'Action', key: 'operation', render: (_text, record: Product) => <div className={productstyles.iconContainer}>
                <FontAwesomeIcon
                    title="Edit category"
                    aria-label="Edit category"
                    className={productstyles.addIcon}
                    icon={faEdit}
                    onClick={() => setEditProduct(record)}
                />
                <FontAwesomeIcon
                    title="Remove category"
                    aria-label="Remove category"
                    className={productstyles.deleteIcon}
                    icon={faTrash}
                    onClick={() => handleDeleteProduct(record)}
                /></div>
        },
    ], []);
    return (
        <>
        <div className="filter-container">
            <h3>Filter by quantity:</h3>
            <Input
                type="number"
                value={filterQuantity}
                onChange={(e) => setFilterQuantity(Number(e.target.value))}
                placeholder="Enter quantity"
            />
            <Button type="primary" onClick={handleFilter}>
                Filter
            </Button>
            <Button type="primary" onClick={handleReset}>
                Reset
            </Button>

            <Checkbox onChange={handleCheckboxChange}>Low stock (1 or less)</Checkbox>
        </div>
        <div className="main-header">
            <h2>{isFiltered ? "Filtered Products" : "All Products"}</h2>
            <Button variant="filled" color="primary" onClick={() => setShowAddProduct(true)}><FontAwesomeIcon
                className={productstyles.addIcon}
                icon={faPlus}
                /> 
                New Product
            </Button>
        
        </div>
        {!data || !categories ? <Loading /> : <>
            <Table<Product>
                rowKey="id"
                columns={columns}
                dataSource={filteredData || data}
            />
            {showAddProduct && <CategoryModal categories={categories} title="Add Product" onSave={saveProduct} handleClose={() => setShowAddProduct(false)} />}
            {!!editProduct && <CategoryModal categories={categories} title="Edit Product" onSave={(v) => saveEditProduct({ old: editProduct, new: v })} handleClose={() => setEditProduct(null)} initialData={editProduct} />}
        </>}


        </>
    )
}
