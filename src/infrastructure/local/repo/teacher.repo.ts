import { CreateTeacher, Teacher, TeacherWithClass, UpdateTeacher } from "@/infrastructure/interfaces/teacher";
import { classData, teacherData } from "../db/data";
import { DatabaseError, NotFoundError } from "@/infrastructure/helper/error";

export default class TeacherRepo {


    public async insert(data: CreateTeacher) {
        //check class
        if (data?.class_id && !classData.find(item => item.id == data.class_id)) throw new DatabaseError('Relasi id kelas tidak ditemukan')

        //find identity_number duplication
        // for (const [, value] of teacherData.entries()) {
        //     if (value.identity_number == data.identity_number) throw new DatabaseError('Nomor identitas sudah digunakan')
        // }
        if (teacherData.values().find(item => item.identity_number == data.identity_number))
            throw new DatabaseError('Nomor identitas sudah digunakan')

        const newData: Teacher = {
            id: +new Date(),
            class_id: null,
            ...data,
            createdAt: new Date(),
            updatedAt: null,
        }
        teacherData.set(newData.id, newData)

        return newData
    }

    public async update(id: number, data: UpdateTeacher) {
        //check data
        const findData = teacherData.get(id)
        if (!findData) throw new NotFoundError(`Data guru dengan id ${id} tidak ditemukan`)

        //check class
        if (data?.class_id) {
            if (!classData.find(item => item.id == data.class_id)) throw new DatabaseError('Relasi id kelas tidak ditemukan')
        }

        //find identity_number duplication
        const findTeacherByIdentity = teacherData.values().find(item => item.identity_number == data.identity_number)
        if (findTeacherByIdentity && findTeacherByIdentity.id !== id)
            throw new DatabaseError('Nomor identitas sudah digunakan')

        const newData: Teacher = {
            ...findData,
            ...data,
            updatedAt: new Date(),
        }
        teacherData.set(newData.id, newData)

        return newData
    }

    public async getAll() {
        const data = Array.from(teacherData.values())
        return data
    }

    public async getAllWithClass() {
        const classMap = new Map(classData.map(item => ([item.id, item])))

        const teacherDataWithClass: TeacherWithClass[] = []

        teacherData.forEach(item => {
            teacherDataWithClass.push({ ...item, class: item?.class_id ? (classMap.get(item.class_id) || null) : null })
        })

        return teacherDataWithClass
    }

    public async delete(id: number) {
        if (!teacherData.has(id)) throw new NotFoundError(`Data guru dengan id ${id} tidak ditemukan`)

        teacherData.delete(id)

        return { id }
    }
}