'use client'

import { Teacher } from "@/infrastructure/interfaces/teacher";
import ModalForm from "./modal-form";
import useGetData from "../_hooks/use-get-data";
import { Class } from "@/infrastructure/interfaces/class";
import { revalidateTeacherData } from "../(pages)/(dashboard)/teachers/action";

export default function TeacherForm({ dataEdit }: { dataEdit?: Teacher }) {
    const { data, isLoading } = useGetData<Class>('/api/class')
    const dataToEdit = dataEdit ? dataEdit as unknown as Record<string, string | number> & { id: number } : undefined

    return (
        <ModalForm
            modalTitle={dataEdit?.id ? "Edit Guru" : "Tambah Guru"}
            dataInputList={[
                { title: 'Nama Lengkap', name: 'full_name' },
                { title: 'NIP', name: 'identity_number', type: 'number', min: 1 },
                { title: 'Alamat', name: 'address' },
                {
                    title: 'Jenis Kelamin', name: 'gender', render: () => (
                        <select name="gender">
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    )
                },
                { title: 'Keilmuan', name: 'subjects' },
                {
                    title: 'Kelas',
                    name: 'class_id',
                    render() {
                        if (isLoading) return <input disabled placeholder="Loading..." />
                        return (
                            <>
                                <select name="class_id" defaultValue={dataEdit?.class_id || undefined}>
                                    {data.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </>
                        )
                    },
                },
            ]}
            buttonName={dataEdit?.id ? "Edit" : "+ Tambah Guru"}
            buttonSize={dataEdit?.id ? "small" : "large"}
            dataEdit={dataToEdit}
            apiUrl="/api/teachers"
            onSuccessCallback={revalidateTeacherData}
        />
    )
}