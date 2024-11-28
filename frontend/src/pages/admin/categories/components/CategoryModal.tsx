import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'
export type SaveCategory = { name: string; link_name: string };
export default function CategoryModal({ title, onSave, handleClose, initialData }: { title: string; onSave: (category: SaveCategory) => void, handleClose: () => void, initialData?: SaveCategory; }) {
    const [form] = Form.useForm();
    const handleSave = (values: SaveCategory) => {
        // Basic validation happens automatically via rules
        onSave(values); // Pass the validated form data
    };


    useEffect(() => {
        console.log(initialData);
        if (initialData) {
            // Update form values when initialData changes
            form.setFieldsValue({
                name: initialData.name || '',
                link_name: initialData.link_name || '',
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
                    label="Category Name"
                    rules={[{
                        required: true,
                        message: 'Please input the category name!'
                    }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item
                    name="link_name"
                    label="Category Link"
                    rules={[{
                        required: true,
                        message: 'Please input the category link name!'
                    }]}
                >
                    <Input placeholder="Enter link name (e.g., men, women)" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
