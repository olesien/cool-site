import { Button, Modal, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useMemo, useState } from "react";
import productstyles from "./product.module.scss";
import { useQuery } from "@tanstack/react-query";
import { base_url, getCategories, getProducts } from "@/services/api";
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
    product_images: ProductImages[];
    sub_categories_id: number;
    sub_categories: SubCategory & { category: Pick<Category, "id" | "name" | "link_name"> }
}
export default function Categories() {
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
        console.log(data);
        try {
            const response = await axios.post<string>(
                base_url + '/products',
                data,
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
                toast.error(err.message);
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const saveEditProduct = async (data: Product) => {
        setEditProduct(null);
        console.log(data);
        try {
            const response = await axios.put<string>(
                base_url + '/categories',
                data,
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
                toast.error(err.message);
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const deleteItem = async (endUrl: string) => {
        try {
            const response = await axios.delete<string>(
                base_url + '/' + endUrl,
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
                toast.error(err.message);
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const handleDeleteProduct = (data: Product) => {
        Modal.confirm({
            title: `Confirm deletion`,
            content: `Are you sure you want to delete the category ${data.name}? Note that all sub-categories under this category will also be deleted`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Perform delete action
                console.log('Deleting item with ID:', data.id);
                deleteItem("products/" + data.id);
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    }

    const columns: TableColumnsType<Product> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Category', dataIndex: 'category_id', render: (_text, record: Product) => <span>{record.sub_categories.name} ({record.sub_categories.category.name})</span> },
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
            <div className={"header"}>
                <h2>Admin Products</h2>
                <Button variant="filled" color="primary" onClick={() => setShowAddProduct(true)}><FontAwesomeIcon
                    className={productstyles.addIcon}
                    icon={faPlus}
                /> New Product</Button>
            </div>
            {!data || !categories ? <Loading /> : <>
                <Table<Product>
                    rowKey="id"
                    columns={columns}
                    dataSource={data.products}
                />
                {showAddProduct && <CategoryModal categories={categories.categories} title="Add Product" onSave={saveProduct} handleClose={() => setShowAddProduct(false)} />}
                {!!editProduct && <CategoryModal categories={categories.categories} title="Edit Product" onSave={(v) => saveEditProduct({ ...editProduct, ...v })} handleClose={() => setEditProduct(null)} initialData={({ name: editProduct.name, price: editProduct.price, sub_category: editProduct.sub_categories })} />}
            </>}


        </>
    )
}
