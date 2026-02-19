'use client'

import { Teacher, TeacherWithClass } from "@/infrastructure/interfaces/teacher"
import React, { useMemo } from "react"
import { deleteTeacher } from "../(pages)/(dashboard)/teachers/action"
import { Button, notification } from "antd"
import ModalDefault from "./modal-default"
import TeacherForm from "./teacher-form"

export default function TeacherTable({ data }: { data: TeacherWithClass[] }) {

    const dataGroupedByClass = useMemo(() => {
        const newData: Record<number, { id: number, name: string, teachers: Teacher[] }> = {}

        data.forEach((value) => {
            const { class: _class, ...teacher } = value
            const classData = _class || { id: -1, name: '-' }
            const getNewData = newData?.[classData.id]

            if (getNewData) {
                getNewData.teachers.push(teacher)
            } else {
                newData[classData.id] = { ...classData, teachers: [teacher] }
            }
        })

        return Array.from(Object.values(newData))
    }, [data])

    const handleDelete = async (id: number) => {
        try {
            await deleteTeacher(id)

            notification.success({
                title: 'Sukses',
                description: 'Data berhasil dihapus'
            })
        } catch (error) {
            notification.error({
                title: 'Gagal',
                description: 'Gagal menghapus data'
            })
        }
    }

    return (
        <div key={'table-container'} className="bg-blue-300 p-1 rounded-xl overflow-hidden">
            <div className="rounded-lg overflow-x-auto">
                <table className="table-data w-full rounded-lg overflow-hidden [&_td]:border-blue-200! [&_td]:bg-blue-50!">
                    <thead className="[&_th]:bg-blue-300! [&_th]:text-left!">
                        <tr>
                            <th>No</th>
                            <th className="max-w-52!">Id</th>
                            <th>NIP</th>
                            <th>Nama Lengkap</th>
                            <th>Alamat</th>
                            <th>Jenis Kelamin</th>
                            <th>Keilmuan</th>
                            <th>Kelas</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataGroupedByClass.map((kelas, kIndex) => {
                            const totalDataInClass = (kelas.teachers?.length ?? 0)
                            const prevDataLength = dataGroupedByClass[kIndex - 1]?.teachers?.length ?? 0

                            return (
                                <React.Fragment key={'k' + kIndex}>
                                    {
                                        (kelas.teachers || []).map((teacher, sIndex) => (
                                            <tr key={"s" + sIndex}>
                                                <td>{(sIndex + prevDataLength) + 1}</td>
                                                <td>{teacher.id}</td>
                                                <td>{teacher.identity_number}</td>
                                                <td>{teacher.full_name}</td>
                                                <td>{teacher.address}</td>
                                                <td>{teacher.gender}</td>
                                                <td>{teacher.subjects}</td>
                                                {sIndex == 0 && <td rowSpan={totalDataInClass}>{kelas.name}</td>}
                                                <td >
                                                    <div className="flex gap-2">
                                                        <ModalDefault modalTitle="Hapus Siswa" buttonTitle="Hapus" buttonSize="small" buttonType="dashed">
                                                            <div className="space-y-2">
                                                                <p className="text-lg">Apakah anda yakin ingin menghapus data guru dengan NIP {`"${teacher.identity_number}"`}?</p>
                                                                <div>
                                                                    <Button type="primary" danger onClick={() => handleDelete(teacher.id)}>Hapus</Button>
                                                                </div>
                                                            </div>
                                                        </ModalDefault>
                                                        <TeacherForm dataEdit={teacher} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}