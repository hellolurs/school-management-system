'use client'
import fetchClient from "@/infrastructure/helper/fetch-client";
import { Button, Input, InputNumber, Modal, notification } from "antd";
import { useActionState, useRef, useState } from "react";

interface Props {
    buttonName?: string,
    buttonSize?: 'large' | 'middle' | 'small',
    modalTitle?: string,
    dataInputList: { title: string, key: string, type?: 'number' | 'string' }[]
    apiUrl: string
    onSuccessCallback?: (data: unknown) => void
    onErrorCallback?: () => void
}

export default function ModalForm(props: Props) {
    const formRef = useRef<HTMLFormElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };

    const actionSubmit = async (_: unknown, formData: FormData) => {
        const body: Record<string, unknown> = {}

        formData.forEach((value, key) => {
            if (value !== '')
                body[key] = value
        })

        console.log(typeof formData.get('identity_number'))

        try {
            const res = await fetchClient(props.apiUrl, 'POST', body)
            props?.onSuccessCallback?.(res.data)

            notification.success({
                title: 'error',
                description: 'Data berhasil disimpan'
            })

            setIsModalOpen(false)
            return res.data
        } catch (error) {
            props?.onErrorCallback?.()

            notification.error({
                title: 'error',
                description: 'Gagal menyimpan data'
            })

            return error
        }
    }

    const [state, formAction, isPending] = useActionState(actionSubmit, null)

    return (
        <>
            <Button type="primary" size={props?.buttonSize || 'large'} onClick={showModal}>{props?.buttonName || 'open'}</Button>
            <Modal
                title={props?.modalTitle || "Modal"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <form ref={formRef} action={formAction}>
                    <div className="space-y-2 mb-4">
                        {
                            props.dataInputList?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <label htmlFor={item.key} className="block">{item.title}</label>
                                        {item.type === 'number' ? <InputNumber name={item.key} size="large" type="number" min={0} className="!w-full" /> :
                                            <Input name={item.key} size="large" />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Button type="primary" size="large" htmlType="submit" loading={isPending}>{'Simpan'}</Button>
                </form>
            </Modal>
        </>
    )
}