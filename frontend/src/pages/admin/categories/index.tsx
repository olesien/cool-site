import { Space, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { useMemo } from "react";

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
        key={v.id}
        columns={subcategories}
        dataSource={v.sub_categories}
        pagination={false}
    />
};
export default function Categories() {
    const data: Category[] = [{ id: 1, name: "Men", link_name: "men", sub_categories: [{ id: 1, categories_id: 1, name: "Jeans", link_name: "jeans" }] }];
    const columns: TableColumnsType<Category> = useMemo(() => [
        { title: 'Category', dataIndex: 'name', key: 'name' },
        { title: 'Link', dataIndex: 'link_name', key: 'link_name' },
        {
            title: 'Action', key: 'operation', render: () => <FontAwesomeIcon
                aria-label="Remove item"
                className="icon"
                icon={faTrash}
                onClick={() => console.log("Delete")}
            />
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
                        aria-label="Remove item"
                        className="icon"
                        icon={faTrash}
                        onClick={() => console.log("Delete")}
                    />
                </Space>
            ),
        },
    ], []);
    return (
        <div><h2>Admin cats</h2><Table<Category>
            columns={columns}
            expandable={{ expandedRowRender: (v => <RenderDropdown v={v} subcategories={subcategories} />) }}
            dataSource={data}
        /></div>
    )
}
