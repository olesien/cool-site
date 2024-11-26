import { Button, Space, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useMemo } from "react";
import categorystyles from "./category.module.scss";
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
        className={categorystyles.tableDropdown}
        key={v.id}
        columns={subcategories}
        dataSource={v.sub_categories}
        pagination={false}
    />
};
export default function Categories() {
    const data: Category[] = [{ id: 1, name: "Men", link_name: "men", sub_categories: [{ id: 1, categories_id: 1, name: "Jeans", link_name: "jeans" }, { id: 2, categories_id: 1, name: "Shorts", link_name: "shorts" }] }];
    const columns: TableColumnsType<Category> = useMemo(() => [
        { title: 'Category', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action', key: 'operation', render: () => <div className={categorystyles.iconContainer}>
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
                <Button variant="filled" color="primary">New Category</Button>
            </div>
            <Table<Category>
                columns={columns}
                expandable={{ expandedRowRender: (v => <RenderDropdown v={v} subcategories={subcategories} />) }}
                dataSource={data}
            />
        </>
    )
}
