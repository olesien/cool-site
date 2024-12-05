import { Modal } from 'antd'
import { ContactForm } from '..';
import contactStyles from "../contact.module.scss";

export default function ContactModal({ form, title, handleClose }: { form: ContactForm; title: string; handleClose: () => void, }) {

    return (
        <Modal
            title={title}
            open={true}
            onOk={handleClose}
            onCancel={handleClose}
            okText="Save"
            footer={null}
        >
            <p className={contactStyles.rad}>{form.message}</p>
        </Modal>
    )
}
