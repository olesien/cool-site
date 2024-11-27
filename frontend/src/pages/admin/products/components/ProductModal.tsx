import { Form, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'
import { Category, SubCategory } from '../../categories';
export type SaveProduct = { name: string; price: number; sub_category: SubCategory };
export default function ProductModal({ categories, title, onSave, handleClose, initialData }: { categories: Category[]; title: string; onSave: (category: SaveProduct) => void, handleClose: () => void, initialData?: SaveProduct }) {
    const [form] = Form.useForm();
    console.log(categories);
    const handleSave = (values: SaveProduct) => {
        // Basic validation happens automatically via rules
        onSave(values); // Pass the validated form data
    };


    useEffect(() => {
        console.log(initialData);
        if (initialData) {
            // Update form values when initialData changes
            form.setFieldsValue({
                name: initialData.name || '',
                price: initialData.price || '',
                category: initialData.sub_category.name + "^" + initialData.sub_category.id
            });
        }
    }, [initialData, form]);
    return (
        <Modal
            title={title}
            open={true}
            onOk={() => form.submit()}
            onCancel={handleClose}
            okText="Save"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
            >
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{
                        required: true,
                        message: 'Please input the category!'
                    }]}
                >
                    <Select
                        style={{ width: 200 }}
                        showSearch
                        placeholder="Select a category"
                        // onChange={handleChange}
                        options={categories.map(category =>
                        ({
                            label: <span>{category.name}</span>,
                            title: category.name,
                            options: category.sub_categories.map((subcat) => ({
                                label: <span>{subcat.name}</span>,
                                value: String(subcat.name + "^" + subcat.id)
                            }))
                        })
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[{
                        required: true,
                        message: 'Please input the product name!'
                    }]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{
                        required: true,
                        message: 'Please input the price!'
                    }]}
                >
                    <Input placeholder="Enter price" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
