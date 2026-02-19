'use client'
import ModalForm from "@/app/_components/modal-form";
import { Button, Table } from "antd";
import useGetClass from "./_hooks/use-get-class";
import { Class } from "@/infrastructure/interfaces/class";
import ModalDefault from "@/app/_components/modal-default";
import fetchClient from "@/infrastructure/helper/fetch-client";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: 150
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
        width: 300,
        render: (value: string) => new Date(value).toLocaleString()
    }
];

export default function ClassPage() {
    const { data, setData, isLoadingGetClass } = useGetClass()

    const handleDelete = async (id: number) => {
        try {
            await fetchClient('/api/class/' + id, 'DELETE')

            setData(prev => prev.filter(item => item.id !== id))
        } catch (error) {

        }
    }

    const actionColumn = [{
        title: 'Aksi',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        render: (_: unknown, record: Class) => (
            <div className="space-x-2">
                <ModalDefault modalTitle="Hapus Kelas" buttonTitle="Hapus" buttonSize="small" buttonType="dashed">
                    <div className="space-y-2">
                        <p className="text-lg">Apakah anda yakin ingin menghapus kelas {`"${record.name}"`}?</p>
                        <div>
                            <Button type="primary" danger onClick={() => handleDelete(record.id)}>Hapus</Button>
                        </div>
                    </div>
                </ModalDefault>
                <ModalForm
                    modalTitle="Ubah Kelas"
                    dataInputList={[{ title: 'Nama Kelas', name: 'name' }]}
                    buttonName="Ubah"
                    buttonSize="small"
                    dataEdit={record as unknown as Record<string, string | number> & { id: number }}
                    apiUrl="/api/class"
                    onSuccessCallback={(res) => {
                        setData(prev => prev.map(value => value.id === record.id ? res as Class : value))
                    }}
                />
            </div>
        ),
    }]

    return (
        <div>
            <div className="">
                <div className="flex justify-between mb-4">
                    <h2 className="text-3xl">Data Kelas</h2>
                    <ModalForm
                        modalTitle="Tambah Kelas"
                        dataInputList={[{ title: 'Nama Kelas', name: 'name' }]}
                        buttonName="+ Tambah Kelas"
                        apiUrl="/api/class"
                        onSuccessCallback={(res) => {
                            setData(prev => [...prev, res as Class])
                        }}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table dataSource={data} columns={[...columns, ...actionColumn]} rowKey={(record) => record.id} loading={isLoadingGetClass} />
                </div>
            </div>
        </div>
    )
}