import { Button, Modal, Space, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useMemo, useState } from "react";
import categorystyles from "./category.module.scss";
import { useQuery } from "@tanstack/react-query";
import { base_url, getCategories } from "@/services/api";
import Loading from "@/components/Loading";
import CategoryModal, { SaveCategory } from "./components/CategoryModal";
import { toast } from "react-toastify";
import axios from "axios";
export type SubCategory = {
    id: number;
    categories_id: number;
    name: string;
    link_name: string;
}
export type Category = {
    id: number;
    name: string;
    link_name: string
    sub_categories: SubCategory[]
}
const RenderDropdown = ({ v, subcategories }: { v: Category, subcategories: TableColumnsType<SubCategory> }) => {
    return <Table<SubCategory>
        rowKey={"id"}
        className={categorystyles.tableDropdown}
        key={`dropdown-${v.id}`}
        columns={subcategories}
        dataSource={v.sub_categories}
        pagination={false}
    />
};
export default function Categories() {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddSubCategory, setShowAddSubCategory] = useState<Category | null>(null); //This contains the category ID
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [editSubCategory, setEditSubCategory] = useState<SubCategory | null>(null);
    const { data, refetch } = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    });
    const saveCategory = async (data: SaveCategory) => {
        setShowAddCategory(false);
        console.log(data);
        try {
            const response = await axios.post<string>(
                base_url + '/categories/add',
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response?.data ?? "Success!");
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
    const saveSubCategory = async (data: SaveCategory) => {
        const id = showAddSubCategory?.id ?? -1;
        setShowAddSubCategory(null);
        console.log(id, data);
        try {
            const response = await axios.post<string>(
                base_url + '/categories/sub/' + id,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            console.log(response.data);
            toast.success(response?.data ?? "Success!");
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

    const saveEditCategory = async (data: Category) => {
        setEditCategory(null);
        console.log(data);
        try {
            const response = await axios.put<string>(
                base_url + '/categories/put/' + data.id,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response?.data ?? "Success!");
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
    const saveEditSubCategory = async (data: SubCategory) => {
        setEditSubCategory(null);
        console.log(data);
        try {
            const response = await axios.put<string>(
                base_url + '/categories/putsub/' + data.id,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response?.data ?? "Success!");
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
            toast.success(response?.data ?? "Success!");
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

    const handleDeleteCategory = (data: Category) => {
        Modal.confirm({
            title: `Confirm deletion`,
            content: `Are you sure you want to delete the category ${data.name}? Note that all sub-categories under this category will also be deleted`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Perform delete action
                console.log('Deleting item with ID:', data.id);
                deleteItem("categories/delete/" + data.id);
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    }

    const handleDeleteSubCategory = (data: SubCategory) => {
        Modal.confirm({
            title: `Confirm deletion`,
            content: `Are you sure you want to delete the sub-category ${data.name}?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Perform delete action
                console.log('Deleting item with ID:', data.id);
                deleteItem("categories/deletesub/" + data.id);
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    }


    const columns: TableColumnsType<Category> = useMemo(() => [
        { title: 'Category', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action', key: 'operation', render: (_text, record: Category) => <div className={categorystyles.iconContainer}>
                <FontAwesomeIcon
                    title="Edit category"
                    aria-label="Edit category"
                    className={categorystyles.addIcon}
                    icon={faEdit}
                    onClick={() => setEditCategory(record)}
                />
                <FontAwesomeIcon
                    title="Remove category"
                    aria-label="Remove category"
                    className={categorystyles.deleteIcon}
                    icon={faTrash}
                    onClick={() => handleDeleteCategory(record)}
                /> <FontAwesomeIcon
                    aria-label="Add Subcategory"
                    title="Add Subcateogry"
                    className={categorystyles.addIcon}
                    icon={faPlus}
                    onClick={() => setShowAddSubCategory(record)} //Add subcategory with a category ID
                /></div>
        },
    ], []);
    const subcategories: TableColumnsType<SubCategory> = useMemo(() => [
        { title: 'Subcategory', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action',
            key: 'operation',
            render: (_text, record: SubCategory) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        title="Edit subcategory"
                        aria-label="Edit subcategory"
                        className={categorystyles.addIcon}
                        icon={faEdit}
                        onClick={() => setEditSubCategory(record)}
                    />
                    <FontAwesomeIcon
                        title="Remove subcategory"
                        aria-label="Remove subcategory"
                        className={categorystyles.deleteIcon}
                        icon={faTrash}
                        onClick={() => handleDeleteSubCategory(record)}
                    />
                </Space>
            ),
        },
    ], []);
    return (
        <>
            <div className={"main-header"}>
                <h2>Admin Categories</h2>
                <Button variant="filled" color="primary" onClick={() => setShowAddCategory(true)}><FontAwesomeIcon
                    className={categorystyles.addIcon}
                    icon={faPlus}
                /> New Category</Button>
            </div>
            {!data ? <Loading /> : <Table<Category>
                rowKey="id"
                columns={columns}
                expandable={{
                    expandedRowRender: (v => <RenderDropdown v={v} subcategories={subcategories} />),
                }}
                dataSource={data}
            />}
            {showAddCategory && <CategoryModal title="Add Category" onSave={saveCategory} handleClose={() => setShowAddCategory(false)} />}
            {!!showAddSubCategory && <CategoryModal title={`Add Sub-Category to ${showAddSubCategory.name}`} onSave={saveSubCategory} handleClose={() => setShowAddSubCategory(null)} />}
            {!!editCategory && <CategoryModal title="Edit Category" onSave={(v) => saveEditCategory({ ...editCategory, name: v.name, link_name: v.link_name })} handleClose={() => setEditCategory(null)} initialData={({ name: editCategory.name, link_name: editCategory.link_name })} />}
            {!!editSubCategory && <CategoryModal title="Edit Sub-Category" onSave={(v) => saveEditSubCategory({ ...editSubCategory, name: v.name, link_name: v.link_name })} handleClose={() => setEditSubCategory(null)} initialData={({ name: editSubCategory.name, link_name: editSubCategory.link_name })} />}

        </>
    )
}
