import { Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
export type SaveCategory = { name: string; link_name: string };
export default function CategoryModal({ title, onSave, handleClose, initialData }: { title: string; onSave: (category: SaveCategory) => void, handleClose: () => void, initialData?: { name: string; link_name: string }; }) {
    const [category, setCategory] = useState({
        name: '',
        link_name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Basic validation
        if (!category.name || !category.link_name) {
            // You might want to show an error message
            return;
        }

        onSave(category);
    };

    useEffect(() => {
        if (initialData) {
            setCategory({
                name: initialData.name || '',
                link_name: initialData.link_name || ''
            });
        }
    }, [initialData]);
    return (
        <Modal title={title} open={true} onOk={handleSave} onCancel={handleClose}>
            <Form
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{
                        required: true,
                        message: 'Please input the category name!'
                    }]}
                >
                    <Input
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
                    />
                </Form.Item>

                <Form.Item
                    name="link_name"
                    label="Category Link"
                    rules={[{
                        required: true,
                        message: 'Please input the category link name!'
                    }]}
                >
                    <Input
                        name="link_name"
                        value={category.link_name}
                        onChange={handleChange}
                        placeholder="Enter link name (e.g., men, women)"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
