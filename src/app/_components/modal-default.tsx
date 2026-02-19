'use client'

import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";

interface Props {
    buttonTitle?: string,
    buttonSize?: 'large' | 'middle' | 'small',
    buttonType?: "link" | "text" | "primary" | "default" | "dashed" | undefined
    modalTitle?: string,
    children?: ReactNode
}

export default function ModalDefault({ children, modalTitle, buttonTitle, buttonSize, buttonType = "primary" }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };

    return (
        <>
            <Button type={buttonType} size={buttonSize || 'large'} onClick={showModal}>{buttonTitle || 'Open'}</Button>
            <Modal
                title={modalTitle || "Modal"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
                classNames={{ header: 'mb-4!' }}
            >
                {children}
            </Modal>
        </>
    )
}