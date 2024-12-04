import { Modal, Table, TableColumnsType } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useMemo, useState } from "react";
import productstyles from "./contact.module.scss";
import { useQuery } from "@tanstack/react-query";
import { base_url, getAllContactForms, } from "@/services/api";
import Loading from "@/components/Loading";
import ContactModal, { SaveProduct } from "./components/ContactModal";
import { toast } from "react-toastify";
import axios from "axios";

export type ContactForm = {
    id: number;
    email: string;
    subject: string;
    message: string;
}
export default function ContactForm() {
    const [showForm, setShowForm] = useState<ContactForm | null>(null);
    const { data, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: getAllContactForms,
    });


    const deleteItem = async (itemID: number) => {
        try {
            const response = await axios.delete<string>(
                base_url + '/products/delete/' + itemID,
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
                if (err.response?.data) {
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const handleDeleteProduct = (data: ContactForm) => {
        Modal.confirm({
            title: `Confirm deletion`,
            content: `Are you sure you want to delete the contact form ${data.id}? `,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // Perform delete action
                console.log('Deleting item with ID:', data.id);
                deleteItem(data.id);
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    }

    const columns: TableColumnsType<ContactForm> = useMemo(() => [
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },

        {
            title: 'Action', key: 'operation', render: (_text, record: ContactForm) => <div className={productstyles.iconContainer}>
                <FontAwesomeIcon
                    title="Show contact form"
                    aria-label="Show contact form"
                    className={productstyles.addIcon}
                    icon={faEdit}
                    onClick={() => setShowForm(record)}
                />
                <FontAwesomeIcon
                    title="Remove contact form"
                    aria-label="Remove contact form"
                    className={productstyles.deleteIcon}
                    icon={faTrash}
                    onClick={() => handleDeleteProduct(record)}
                /></div>
        },
    ], []);
    return (
        <>
            <div className="main-header">
                <h2>Contactlist</h2>

            </div>
            {!data ? <Loading /> : <>
                <Table<ContactForm>
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                />
                {/* {showForm && <ContactModal categories={categories} title="Edit Product" onSave={(v) => saveEditProduct({ old: editProduct, new: v })} handleClose={() => setEditProduct(null)} initialData={editProduct} />} */}
            </>}


        </>
    )
}
