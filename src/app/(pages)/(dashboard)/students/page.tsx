'use client'

import ModalDefault from "@/app/_components/modal-default";
import { Class } from "@/infrastructure/interfaces/class";
import { Student } from "@/infrastructure/interfaces/student";
import React, { useMemo } from "react";
import useGetData from "@/app/_hooks/use-get-data";
import { Button } from "antd";
import StudentForm from "@/app/_components/student-form";

type StudentWithClass = Student & { class?: Class | null }

export default function StudentsPage() {
    const { data, actionGetData, isLoading } = useGetData<StudentWithClass>('/api/students')

    const groupedDataByClass = useMemo(() => {
        const studentsGroupByClass = new Map<number, { name: string } & { students: Student[] }>()

        for (const item of data) {
            if (item?.class && item?.class_id) {
                const { class: _class, ...student } = item
                if (studentsGroupByClass.has(item.class_id)) {
                    studentsGroupByClass.get(item.class_id)?.students.push(student)
                } else {
                    studentsGroupByClass.set(item.class_id, { ..._class, students: [student] })
                }
            } else {
                const { class: _class, ...student } = item
                if (studentsGroupByClass.has(-1)) {
                    studentsGroupByClass.get(-1)?.students.push(student)
                } else {
                    studentsGroupByClass.set(-1, { name: '-', students: [student] })
                }
            }
        }

        return Array.from(studentsGroupByClass.values())
    }, [data])

    const handleDeleteStudent = async (id: number) => {
        await fetch(`/api/students/${id}`, {
            method: 'DELETE',
        })
        actionGetData()
    }

    return (
        <div>
            <div className="">
                <div className="flex justify-between mb-4">
                    <h2 className="text-3xl">Data Siswa</h2>
                    <ModalDefault modalTitle="Tambah Siswa" buttonTitle="+ Tambah Siswa">
                        <StudentForm onSuccessCallback={() => actionGetData()} />
                    </ModalDefault>
                </div>
                <div key={'table-container'} className="bg-blue-300 p-1 rounded-xl overflow-hidden">
                    <div className="rounded-lg overflow-x-auto">
                        <table className="table-data w-full rounded-lg overflow-hidden [&_td]:border-blue-200! [&_td]:bg-blue-50!">
                            <thead className="[&_th]:bg-blue-300! [&_th]:text-left!">
                                <tr>
                                    <th>No</th>
                                    <th className="max-w-52!">Id</th>
                                    <th>NIS</th>
                                    <th>Nama Lengkap</th>
                                    <th>Tempat Lahir</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Alamat</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Agama</th>
                                    <th>Kelas</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDataByClass.map((kelas, kIndex) => {
                                    const totalDataInClass = (kelas.students?.length ?? 0)
                                    const prevDataLength = groupedDataByClass[kIndex - 1]?.students?.length ?? 0

                                    return (
                                        <React.Fragment key={'k' + kIndex}>
                                            {
                                                (kelas.students || []).map((student, sIndex) => (
                                                    <tr key={"s" + sIndex}>
                                                        <td>{(sIndex + prevDataLength) + 1}</td>
                                                        <td>{student.id}</td>
                                                        <td>{student.identity_number}</td>
                                                        <td>{student.full_name}</td>
                                                        <td>{student.place_of_birth}</td>
                                                        <td>{new Date(student.date_birth).toLocaleDateString()}</td>
                                                        <td>{student.address}</td>
                                                        <td>{student.gender}</td>
                                                        <td>{student.religion}</td>
                                                        {sIndex == 0 && <td rowSpan={totalDataInClass}>{kelas.name}</td>}
                                                        <td >
                                                            <div className="flex gap-2">
                                                                <ModalDefault modalTitle="Hapus Siswa" buttonTitle="Hapus" buttonSize="small" buttonType="dashed">
                                                                    <div className="space-y-2">
                                                                        <p className="text-lg">Apakah anda yakin ingin menghapus data siswa dengan NIS {`"${student.identity_number}"`}?</p>
                                                                        <div>
                                                                            <Button type="primary" danger onClick={() => handleDeleteStudent(student.id)}>Hapus</Button>
                                                                        </div>
                                                                    </div>
                                                                </ModalDefault>
                                                                <ModalDefault modalTitle="Edit Siswa" buttonTitle="Edit" buttonSize="small">
                                                                    <StudentForm
                                                                        dataEdit={{
                                                                            id: student.id,
                                                                            full_name: student.full_name,
                                                                            identity_number: student.identity_number,
                                                                            place_of_birth: student.place_of_birth,
                                                                            date_birth: new Date(student.date_birth).toISOString().split('T')[0],
                                                                            address: student.address,
                                                                            gender: student.gender,
                                                                            religion: student.religion,
                                                                            class_id: student.class_id ?? ''
                                                                        }}
                                                                        onSuccessCallback={() => actionGetData()} />
                                                                </ModalDefault>
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
                        {isLoading && data.length == 0 ? <p className="text-center text-gray-500 p-5">Loading...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}