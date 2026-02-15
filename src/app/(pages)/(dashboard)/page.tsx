'use client'

import useGetData from "@/app/_hooks/use-get-data";
import { Class } from "@/infrastructure/interfaces/class";
import { Student } from "@/infrastructure/interfaces/student";
import { Teacher } from "@/infrastructure/interfaces/teacher";
import { Table } from "antd";

export default function Home() {
  const { data, isLoading } = useGetData<(Class & { teachers: Teacher[], students: Student[] })>('/api/class?include=teachers,students')

  return (
    <div>
      <div>
        <h1 className="text-3xl mb-5">Dashboard</h1>
        <div className="space-y-5">
          {data.map((item, index) => {
            return (
              <div key={index} className="bg-amber-50 rounded-xl border-blue-200 border-2 overflow-hidden">
                <div className="bg-blue-200 p-4">
                  <h3 className="text-xl">Kelas {item.name}</h3>
                </div>
                <div className="bg-white">
                  <div className="p-4 bg-gray-100">
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold">Daftar Guru</p>
                      <hr className="flex-1 border-blue-400" />
                    </div>
                    <Table
                      dataSource={item.teachers}
                      columns={[
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
                      ]}
                      rowKey={(record) => record.id}
                      loading={isLoading} />
                  </div>
                  <div className="p-4 bg-gray-100">
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold">Daftar Siswa</p>
                      <hr className="flex-1 border-blue-400" />
                    </div>
                    <Table
                      dataSource={item.teachers}
                      columns={[
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
                      ]}
                      rowKey={(record) => record.id}
                      loading={isLoading} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
