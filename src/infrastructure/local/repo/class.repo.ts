import { Class, CreateClass } from "@/infrastructure/interfaces/class"
import { studentData } from "../db/data"
import { Student } from "@/infrastructure/interfaces/student"
import { DatabaseError, NotFoundError } from "@/infrastructure/helper/error"

export default class ClassRepo {

    constructor(private classData: Class[]) { }

    async insert(data: CreateClass) {
        const id = +new Date()

        //check name duplication
        const findClass = this.classData.find(item => item.name.toLowerCase() == data.name.toLowerCase())
        if (findClass) return null

        //insert new class
        const newClass: Class = {
            name: data.name,
            id: id,
            createdAt: new Date(),
            updatedAt: null
        }
        this.classData.push(newClass)

        return newClass
    }

    async update(id: number, data: Partial<CreateClass>) {
        const findClassIndex = this.classData.findIndex(item => item.id == id)

        //check data
        if (findClassIndex < 0) throw new NotFoundError(`Kelas dengan id ${id} tidak ditemukan`)

        //check name duplication
        if (data?.name) {
            const findIndexByname = this.classData.findIndex(item => item.name.toLowerCase() == data?.name?.toLowerCase())
            if (findIndexByname >= 0 && findIndexByname !== findClassIndex) throw new DatabaseError('Nama kelas tidak boleh sama')
        }

        const findClass = this.classData[findClassIndex]
        const newClass: Class = {
            ...findClass,
            name: data?.name ?? findClass.name,
            description: data?.description ?? findClass.description,
            updatedAt: new Date()
        }

        //update data
        this.classData[findClassIndex] = newClass

        return newClass
    }

    async delete(id: number) {
        const findClassIndex = this.classData.findIndex(item => item.id == id)

        if (findClassIndex < 0) return null

        //detele from data
        this.classData.splice(findClassIndex, 1)

        return { id }
    }

    async getAll() {
        return this.classData
    }

    async getAllWithStudent() {
        const studentByClass = new Map<number, Student[]>()
        studentData.forEach(item => {
            if (item.class_id) {
                if (studentByClass.has(item.class_id)) {
                    studentByClass.get(item.class_id)?.push(item)
                } else {
                    studentByClass.set(item.class_id, [item])
                }
            }
        })

        return this.classData.map(item => ({ ...item, students: studentByClass.get(item.id) }))
    }

    async getById(id: number) {
        return this.classData.find(item => item.id == id)
    }


}