import { Class } from "./class"

export interface Teacher {
    id: number
    full_name: string
    identity_number: number
    address: string
    gender: string
    subjects: string
    createdAt: Date | null
    updatedAt: Date | null
    class_id?: number | null
}

type TeacherWithClass = Teacher & { class: Class | null }

type CreateTeacher = Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>

type UpdateTeacher = Partial<CreateTeacher>