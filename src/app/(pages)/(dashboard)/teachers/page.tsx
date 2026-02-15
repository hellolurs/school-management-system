'use client'
import ModalForm from "@/app/_components/Modal/ModalForm";
import useGetData from "@/app/_hooks/use-get-data";
import { Teacher, TeacherWithClass } from "@/infrastructure/interfaces/teacher";
import { Table } from "antd";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'NIP',
        dataIndex: 'identity_number',
        key: 'identity_number',
    },
    {
        title: 'Nama Lengkap',
        dataIndex: 'full_name',
        key: 'full_name',
    },
    {
        title: 'Alamat',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Jenis Kelamin',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Keilmuan',
        dataIndex: 'subjects',
        key: 'subjects',
    },
    {
        title: 'Dibuat Tanggal',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Kelas',
        dataIndex: 'class',
        key: 'class',
        render: (_: unknown, record: TeacherWithClass) => (record?.class?.name || '-'),
    },
];

export default function ClassPage() {
    const { data, actionGetData, isLoading } = useGetData<Teacher>('/api/teachers')


    const actionColumn = [{
        title: 'Aksi',
        dataIndex: 'action',
        key: 'action',
    }]

    return (
        <div>
            <div className="">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl">Data Guru</h2>
                    <ModalForm
                        modalTitle="Tambah Guru"
                        dataInputList={[
                            {
                                title: 'NIP',
                                key: 'identity_number',
                                type: 'number',
                            },
                            {
                                title: 'Nama Lengkap',
                                key: 'full_name',
                            },
                            {
                                title: 'Alamat',
                                key: 'address',
                            },
                            {
                                title: 'Jenis Kelamin',
                                key: 'gender',
                            },
                            {
                                title: 'Keilmuan',
                                key: 'subjects',
                            },
                            {
                                title: 'Id Kelas',
                                key: 'class_id',
                            },
                        ]}
                        buttonName="+ Tambah Guru"
                        apiUrl="/api/teachers"
                        onSuccessCallback={() => {
                            actionGetData()
                        }}
                    />
                </div>
                <Table dataSource={data} columns={[...columns, ...actionColumn]} rowKey={(record) => record.id} loading={isLoading} />
            </div>
        </div>
    )
}