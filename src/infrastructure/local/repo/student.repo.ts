import { CreateStudent, Student } from "@/infrastructure/interfaces/student";
import { classData, studentData } from "../db/data";
import { DatabaseError, NotFoundError } from "@/infrastructure/helper/error";


export default class StudentRepo {


    public async insert(data: CreateStudent) {
        //check class
        if (data?.class_id) {
            const findClass = classData.find(item => item.id == data.class_id)
            if (!findClass) throw new DatabaseError('Relasi id kelas tidak ditemukan')
        }

        //check identity_number duplication
        const findStudentByIdentity = studentData.find(item => item.identity_number == data.identity_number)
        if (findStudentByIdentity) throw new DatabaseError('Nomor identitas sudah digunakan')

        //insert new class
        const newData: Student = {
            id: +new Date(),
            class_id: null,
            ...data,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
        }
        studentData.push(newData)

        return newData
    }

    public async update(id: number, data: Partial<CreateStudent>) {
        const findStudentIndex = studentData.findIndex(item => item.id == id)
        if (findStudentIndex < 0) throw new NotFoundError(`Siswa dengan id ${id} tidak ditemukan`)

        //check class relation
        if (data?.class_id) {
            const findClass = classData.find(item => item.id == data.class_id)
            if (!findClass) throw new DatabaseError('Relasi id kelas tidak ditemukan')
        }

        //check identity_number duplication
        const findStudentByIdentity = studentData.find(item => item.identity_number == data.identity_number)
        if (findStudentByIdentity && findStudentByIdentity.id !== id) throw new DatabaseError('Nomor identitas sudah digunakan')


        const findStudent = studentData[findStudentIndex]
        //update data
        const newData: Student = {
            ...findStudent,
            ...data,
            updatedAt: new Date(),
        }
        studentData[findStudentIndex] = newData

        return newData
    }

    public async delete(id: number) {
        const findStudentIndex = studentData.findIndex(item => item.id == id)
        if (findStudentIndex < 0) throw new NotFoundError(`Siswa dengan id ${id} tidak ditemukan`)

        studentData.splice(findStudentIndex, 1)

        return { id }
    }

    public async getAll() {
        return studentData
    }

    public async getById(id: number) {
        return studentData.find(item => item.id == id)
    }

    public async getAllWithClass() {
        const classDataMap = new Map(classData.map(item => ([item.id, item])))

        return studentData.map(item => ({ ...item, class: item.class_id ? (classDataMap.get(item.class_id) || null) : null }))
    }

    public async getByClass(class_id: number) {
        return studentData.filter(item => item.class_id == class_id)
    }

}