import { Button, Space, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useMemo, useState } from "react";
import categorystyles from "./category.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api";
import Loading from "@/components/Loading";
import CategoryModal, { SaveCategory } from "./components/CategoryModal";
export type SubCategory = {
    id: number;
    categories_id: number;
    name: string;
    link_name: string;
}
export type Category = {
    id: number;
    name: string;
    link_name: string;
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
    const [showAddSubCategory, setShowAddSubCategory] = useState(0); //This contains the category ID
    const { data } = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    });
    const saveCategory = (data: SaveCategory) => {
        setShowAddCategory(false);
        console.log(data);
    }
    const saveSubCategory = (data: SaveCategory) => {
        const id = showAddSubCategory;
        setShowAddSubCategory(0);
        console.log(id, data);
    }

    const columns: TableColumnsType<Category> = useMemo(() => [
        { title: 'Category', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action', key: 'operation', render: () => <div className={categorystyles.iconContainer}>
                <FontAwesomeIcon
                    title="Edit category"
                    aria-label="Edit category"
                    className={categorystyles.addIcon}
                    icon={faEdit}
                    onClick={() => console.log("Edit")}
                />
                <FontAwesomeIcon
                    title="Remove category"
                    aria-label="Remove category"
                    className={categorystyles.deleteIcon}
                    icon={faTrash}
                    onClick={() => console.log("Delete")}
                /> <FontAwesomeIcon
                    aria-label="Add Subcategory"
                    title="Add Subcateogry"
                    className={categorystyles.addIcon}
                    icon={faPlus}
                    onClick={() => console.log("Add")}
                /></div>
        },
    ], []);
    const subcategories: TableColumnsType<SubCategory> = useMemo(() => [
        { title: 'Subcategory', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action',
            key: 'operation',
            render: () => (
                <Space size="middle">
                    <FontAwesomeIcon
                        title="Edit subcategory"
                        aria-label="Edit subcategory"
                        className={categorystyles.addIcon}
                        icon={faEdit}
                        onClick={() => console.log("Edit")}
                    />
                    <FontAwesomeIcon
                        title="Remove subcategory"
                        aria-label="Remove subcategory"
                        className={categorystyles.deleteIcon}
                        icon={faTrash}
                        onClick={() => console.log("Delete")}
                    />
                </Space>
            ),
        },
    ], []);
    return (
        <>
            <div className={"header"}>
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
                dataSource={data.categories}
            />}
            {showAddCategory && <CategoryModal title="Add Category" onSave={saveCategory} handleClose={() => setShowAddCategory(false)} />}
            {!!showAddSubCategory && <CategoryModal title="Add Sub-Category" onSave={saveSubCategory} handleClose={() => setShowAddSubCategory(0)} />}

        </>
    )
}
