'use client'

import fetchClient from "@/infrastructure/helper/fetch-client";
import { Button, Modal, notification } from "antd";
import { InputHTMLAttributes, ReactNode, useActionState, useState } from "react";

type DataInputList = InputHTMLAttributes<HTMLInputElement> & { title: string, name: string, render?: () => ReactNode }

interface Props {
    buttonName?: string,
    buttonSize?: 'large' | 'middle' | 'small',
    modalTitle?: string,
    dataInputList: DataInputList[]
    dataEdit?: { id: number } & Record<string, string | number>
    apiUrl: string
    closeOnSuccess?: boolean
    onSuccessCallback?: (data: unknown) => void
    onErrorCallback?: () => void
}

export default function ModalForm(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };

    const { id: dataId, ...defaultValue } = props.dataEdit ?? { id: null }

    const actionSubmit = async (_: unknown, formData: FormData) => {
        const body: Record<string, unknown> = {}

        formData.forEach((value, key) => {
            if (value !== '')
                body[key] = value
        })

        try {
            const res = dataId ? await fetchClient(props.apiUrl + `/${dataId}`, 'PATCH', body) : await fetchClient(props.apiUrl, 'POST', body)
            props?.onSuccessCallback?.(res.item)

            notification.success({
                title: 'Sukses',
                description: 'Data berhasil disimpan'
            })

            if (props.closeOnSuccess) setIsModalOpen(false)

            return { data: res.item }
        } catch (error) {
            const err = error as { message: string, details: Record<string, { errors: string[] }> }
            props?.onErrorCallback?.()

            notification.error({
                title: 'Gagal',
                description: 'Gagal menyimpan data. ' + err.message
            })

            return { isError: true, errors: err.details, data: body }
        }
    }

    const [state, formAction, isPending] = useActionState(actionSubmit, { isError: false, errors: {}, data: defaultValue })
    const [inputDates, setInputDates] = useState<{ [key: string]: string }>()

    return (
        <>
            <Button type="primary" size={props?.buttonSize || 'large'} onClick={showModal}>{props?.buttonName || 'open'}</Button>
            <Modal
                title={props?.modalTitle || "Modal"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
                classNames={{ header: 'mb-4!' }}
            >
                <form action={formAction}>
                    <div className="space-y-4 mb-4">
                        {
                            props.dataInputList?.map((item, index) => {
                                const { title, ...htmlInput } = item
                                return (
                                    <div key={index}>
                                        <label htmlFor={item.name} className="block">{title}</label>
                                        {item.render
                                            ? item.render()
                                            : item.type == 'date'
                                                ? (
                                                    <div>
                                                        <input type="date" onChange={(e) => { setInputDates(prev => { return { ...prev, [item.name]: new Date(e.target.value).toISOString() } }) }}
                                                            defaultValue={state?.data?.['date_birth']} />
                                                        <input type="hidden" name="date_birth" value={inputDates?.[item.name]} />
                                                    </div>
                                                )
                                                : <input {...htmlInput} defaultValue={state?.data?.[item.name]} />
                                        }
                                        {state?.errors?.[item.name]?.errors?.map((error: string, index: number) => (<p key={index} className="text-red-500">{error}</p>))}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    <Button type="primary" size="large" htmlType="submit" loading={isPending} block>{'Simpan'}</Button>
                </form>
            </Modal>
        </>
    )
}