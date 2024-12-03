import { Button, Form, Input, Modal, Select, Image as AntImage } from 'antd'
import { useEffect, useState } from 'react'
import { Category } from '../../categories';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons/faSquareMinus";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import productstyles from "../product.module.scss";
import { Product } from '..';
export type SaveProduct = { name: string; price: number; category: string, images: string[] };
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
export default function ProductModal({ categories, title, onSave, handleClose, initialData }: { categories: Category[]; title: string; onSave: (category: SaveProduct) => void, handleClose: () => void, initialData?: Product }) {
    const [form] = Form.useForm();
    //below code is to allow for previews
    const [previews, setPreviews] = useState<{ [key: string]: string }>({});
    const handlePreviewUpdate = (index: string, value: string) => {
        setPreviews((prev) => ({ ...prev, [index]: value }));
    };
    const handleSave = (values: SaveProduct) => {
        // Basic validation happens automatically via rules
        onSave(values); // Pass the validated form data
    };


    useEffect(() => {
        if (initialData) {
            // Update form values when initialData changes
            const images = initialData.images.map(img => img.url);
            form.setFieldsValue({
                name: initialData.name || '',
                price: String(initialData.price || '').replace(",", "."),
                category: initialData.sub_category.name + "^" + initialData.sub_category.id,
                images: images
            });
            if (images.length > 0) {
                //Take the list of image urls, and then convert them to an object where the index is the key, like {["1"]: "urlhere"}
                setPreviews(images.reduce((obj, img, i) => ({ ...obj, [String(i)]: img }), {}));
            }
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
                        message: 'Please input the price!',
                        min: 0
                    }]}
                >
                    <Input placeholder="Enter price" type='number' />
                </Form.Item>
                <Form.List
                    name="images"

                    rules={[
                        {
                            validator: async (_, images) => {
                                if (images && images.length > 5) {
                                    return Promise.reject(new Error('Max 5 images allowed'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => {
                        const moveField = (index: number, direction: "up" | "down") => {
                            const newFields = [...fields];
                            const temp = newFields[index];

                            if (direction === 'up' && index > 0) {
                                newFields[index] = newFields[index - 1];
                                newFields[index - 1] = temp;
                                form.setFieldsValue({
                                    images: newFields.map(field => form.getFieldValue(['images', field.name]))
                                });
                            }

                            if (direction === 'down' && index < fields.length) {
                                newFields[index] = newFields[index + 1];
                                newFields[index + 1] = temp;
                                form.setFieldsValue({
                                    images: newFields.map(field => form.getFieldValue(['images', field.name]))
                                });
                            }
                            //Rerender previews
                            setPreviews(newFields.reduce((obj, field) => ({ ...obj, [field.key]: form.getFieldValue(['images', field.name]) }), {}));
                        };
                        return <>
                            {fields.map((field, index) => {
                                return <div className={productstyles.ImageContainer} key={field.key}>
                                    <Form.Item
                                        {...(formItemLayout)}
                                        label={index === 0 ? 'Images' : ''}
                                        required={false}
                                    >
                                        <div className={index === 0 ? `${productstyles.highlightedImage} ${productstyles.field}` : productstyles.field}
                                        >
                                            <div className={productstyles.upDown}>
                                                <div className={index == 0 ? productstyles.chevronIconDisabled : productstyles.chevronIcon}
                                                    onClick={() => {
                                                        if (index == 0) return;
                                                        moveField(index, "up");
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}

                                                    />
                                                </div>
                                                <div className={index == (fields.length - 1) ? productstyles.chevronIconDisabled : productstyles.chevronIcon}
                                                    onClick={() => {
                                                        if (index == fields.length - 1) return;
                                                        moveField(index, "down");
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}


                                                    />
                                                </div>
                                            </div>
                                            <span>{index + 1}.</span>
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input image url or delete the field.",
                                                    },
                                                ]}
                                                noStyle

                                            >
                                                <Input placeholder="image url" style={{ width: '80%' }} onBlur={(e) => handlePreviewUpdate(String(index), e.target.value)} />
                                            </Form.Item>
                                            {fields.length >= 1 ? (

                                                <div className={productstyles.delicon}
                                                    onClick={() => {
                                                        remove(field.name);
                                                        setPreviews((prev) => {
                                                            const updatedPreviews = { ...prev };
                                                            delete updatedPreviews[index];
                                                            return updatedPreviews;
                                                        });
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faSquareMinus}


                                                    />
                                                </div>
                                            ) : null}
                                        </div>


                                    </Form.Item>
                                    {previews[index] && <AntImage
                                        style={{ borderRadius: '10px' }}
                                        width={"auto"}
                                        height={120}
                                        src={previews[index]}
                                        fallback="data:image/png;base64,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"
                                    />}

                                </div>
                            }

                            )}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<FontAwesomeIcon
                                        icon={faPlus}

                                    />}
                                >
                                    Add Image
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    }

                    }
                </Form.List>
            </Form>
        </Modal>
    )
}
