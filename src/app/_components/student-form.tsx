'use client'

import fetchClient from "@/infrastructure/helper/fetch-client";
import { Button, notification } from "antd";
import { useActionState, useRef, useState } from "react";
import InputForm from "./input-form";
import useGetData from "../_hooks/use-get-data";
import { Class } from "@/infrastructure/interfaces/class";

export default function StudentForm({ dataEdit, onSuccessCallback }: { dataEdit?: { id: number } & Record<string, string | number>, onSuccessCallback?: () => void }) {
    const { data: dataClass, isLoading: loadingDataClass } = useGetData<Class>('/api/class')

    const { id: dataId, ...defaultValue } = dataEdit ?? { id: null }
    const formRef = useRef<HTMLFormElement>(null)
    const [birtDate, setBirtDate] = useState(dataEdit?.date_birth ? new Date(dataEdit.date_birth).toISOString() : '')

    const actionSubmit = async (_: unknown, formData: FormData) => {
        const body: Record<string, string | number> = {}

        formData.forEach((value, key) => {
            if (value !== '' && typeof value == 'string') body[key] = value
        })

        try {
            if (dataId) {
                await fetchClient(`/api/students/${dataId}`, 'PATCH', body)
            } else {
                await fetchClient('/api/students', 'POST', body)
            }

            notification.success({
                title: 'Sukses',
                description: 'Data berhasil disimpan'
            })

            onSuccessCallback?.()

            return { isError: false, data: dataEdit ? { ...body, date_birth: birtDate.split('T')?.[0] ?? '' } as Record<string, string | number> : {} }
        } catch (error) {
            const err = error as { message: string, details: Record<string, { errors: string[] }> }

            notification.error({
                title: 'Gagal',
                description: `Gagal menyimpan data. ${err.message}`
            })

            return { isError: true, errors: err.details, data: { ...body, date_birth: birtDate.split('T')?.[0] ?? '' } as Record<string, string | number> }
        }
    }

    const [state, formAction] = useActionState(actionSubmit, { isError: false, data: defaultValue, errors: {} })


    return (
        <div>
            <form ref={formRef} action={formAction} className="space-y-4">
                <InputForm title="Nama Lengkap" name="full_name" type="text"
                    errors={state?.errors?.['full_name']?.errors} required
                    defaultValue={state?.data?.['full_name']} />
                <InputForm title="NIS" name="identity_number" type="number" min={0}
                    errors={state?.errors?.['identity_number']?.errors} required
                    defaultValue={state?.data?.['identity_number']} />
                <InputForm title="Tempat Lahir" name="place_of_birth" type="text"
                    errors={state?.errors?.['place_of_birth']?.errors} required
                    defaultValue={state?.data?.['place_of_birth']} />
                <div>
                    <label htmlFor={'date_birth'}>Tanggal Lahir (Bulan/Hari/Tahun)</label>
                    <input type="date" onChange={(e) => { setBirtDate(new Date(e.target.value).toISOString()) }}
                        defaultValue={state?.data?.['date_birth']} />
                    <input type="hidden" name="date_birth" value={birtDate} />
                    {state?.errors?.['date_birth']?.errors.map((error, index) => <p key={index} className="text-red-400 text-sm">{error}</p>)}
                </div>
                <div>
                    <label htmlFor={'gender'}>Jenis Kelamin</label>
                    <select name="gender" defaultValue={state?.data?.['gender']}>
                        <option value={'Laki-laki'}>Laki-laki</option>
                        <option value={'Perempuan'}>Perempuan</option>
                    </select>
                    {state?.errors?.['gender']?.errors.map((error, index) => <p key={index} className="text-red-400 text-sm">{error}</p>)}
                </div>
                <InputForm title="Agama" name="religion" type="text"
                    errors={state?.errors?.['religion']?.errors} required
                    defaultValue={state?.data?.['religion']} />
                <InputForm title="Alamat" name="address" type="text"
                    errors={state?.errors?.['address']?.errors} required
                    defaultValue={state?.data?.['address']} />
                <div>
                    <label htmlFor={'class_id'}>Kelas</label>
                    {
                        loadingDataClass
                            ? <input type="number" min={0} disabled defaultValue={state?.data?.['class_id']} />
                            : <select name="class_id" defaultValue={state?.data?.['class_id']}>
                                {/* <option value={undefined}></option> */}
                                {dataClass.map((item, index) =>
                                    <option key={index} value={item.id}>{item.name}</option>
                                )}
                            </select>
                    }
                    {state?.errors?.['class_id']?.errors.map((error, index) => <p key={index} className="text-red-400 text-sm">{error}</p>)}
                </div>
                <br />
                <Button type="primary" size="large" block htmlType="submit">Simpan</Button>
            </form>
        </div>
    )
}
