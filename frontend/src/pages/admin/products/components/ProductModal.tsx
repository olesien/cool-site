import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'
export type SaveProduct = { name: string; price: number; sub_categories_id: number };
export default function ProductModal({ title, onSave, handleClose, initialData }: { title: string; onSave: (category: SaveProduct) => void, handleClose: () => void, initialData?: SaveProduct }) {
    const [form] = Form.useForm();
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
