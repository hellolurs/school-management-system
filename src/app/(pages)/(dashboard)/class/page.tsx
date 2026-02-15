'use client'
import ModalForm from "@/app/_components/Modal/ModalForm";
import { Table } from "antd";
import useGetClass from "./_hooks/use-get-class";
import { Class } from "@/infrastructure/interfaces/class";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nama Kelas',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Dibuat Tanggal',
        dataIndex: 'createdAt',
        key: 'createdAt',
    }
];

export default function ClassPage() {
    const { data, setData, isLoadingGetClass } = useGetClass()

    const actionColumn = [{
        title: 'Aksi',
        dataIndex: 'action',
        key: 'action',
        render: (_: unknown, record: Class) => (
            <div>

            </div>
        ),
    }]

    return (
        <div>
            <div className="max-w-3xl">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl">Data Kelas</h2>
                    <ModalForm
                        modalTitle="Tambah Kelas"
                        dataInputList={[{ title: 'Nama Kelas', key: 'name' }]}
                        buttonName="+ Tambah Kelas"
                        apiUrl="/api/class"
                        onSuccessCallback={(res) => {
                            setData(prev => [...prev, res as Class])
                        }}
                    />
                    {/* <Button type="primary" size="large">+ Tambah Kelas</Button> */}
                </div>
                <Table dataSource={data} columns={[...columns, ...actionColumn]} rowKey={(record) => record.id} loading={isLoadingGetClass} />
            </div>
        </div>
    )
}