'use client'
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
        title: 'NIS',
        dataIndex: 'identity_number',
        key: 'identity_number',
    },
    {
        title: 'Nama Lengkap',
        dataIndex: 'full_name',
        key: 'full_name',
    },
    {
        title: 'Tempat Lahir',
        dataIndex: 'place_of_birth',
        key: 'place_of_birth',
    },
    {
        title: 'Tanggal Lahir',
        dataIndex: 'date_birth',
        key: 'date_birth',
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
        title: 'Agama',
        dataIndex: 'religion',
        key: 'religion',
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
    const { data, isLoading } = useGetData<Teacher>('/api/students')


    const actionColumn = [{
        title: 'Aksi',
        dataIndex: 'action',
        key: 'action',
    }]

    return (
        <div>
            <div className="">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl">Data Siswa</h2>
                </div>
                <Table dataSource={data} columns={[...columns, ...actionColumn]} rowKey={(record) => record.id} loading={isLoading} />
            </div>
        </div>
    )
}