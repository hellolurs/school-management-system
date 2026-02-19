'use client'

import useGetData from "@/app/_hooks/use-get-data";
import { Class } from "@/infrastructure/interfaces/class";
import { Student } from "@/infrastructure/interfaces/student";
import { Teacher } from "@/infrastructure/interfaces/teacher";
import React from "react";


export default function Home() {
  const { data, isLoading } = useGetData<(Class & { teachers: Teacher[], students: Student[] })>('/api/class?include=teachers,students')



  return (
    <div>
      <h1 className="text-3xl mb-5">Dashboard</h1>
      <div className="bg-blue-300 p-1 rounded-xl">
        <div className="overflow-x-auto">
          <table className="table-data w-full rounded-lg overflow-hidden [&_td]:border-blue-200! [&_td]:bg-blue-50!">
            <thead className="[&_th]:bg-blue-300! [&_th]:text-left!">
              <tr>
                <th className="w-52!">Id</th>
                <th>Nama</th>
                <th>Peran</th>
                <th>Kelas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((kelas, kIndex) => {
                const totalDataInclass = (kelas.students?.length ?? 0) + (kelas.teachers?.length ?? 0)

                return (
                  <React.Fragment key={'k' + kIndex}>
                    {
                      (kelas.students || []).map((student, sIndex) => (
                        <tr key={"s" + sIndex}>
                          <td>{student.id}</td>
                          <td>{student.full_name}</td>
                          {sIndex == 0 && <td rowSpan={kelas.students?.length || 1}>Siswa</td>}
                          {sIndex == 0 && <td rowSpan={totalDataInclass}>{kelas.name}</td>}
                        </tr>
                      ))
                    }
                    {
                      (kelas.teachers || []).map((teacher, tIndex) => (
                        <tr key={'t' + tIndex} className="">
                          <td>{teacher.id}</td>
                          <td>{teacher.full_name}</td>
                          {tIndex == 0 && <td rowSpan={kelas.teachers?.length || 1}>Guru</td>}
                          {(!kelas.students?.length) && tIndex == 0 && <td rowSpan={totalDataInclass}>{kelas.name}</td>}
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
    </div>
  );
}
