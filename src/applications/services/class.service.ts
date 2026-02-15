import { CreateClass } from "@/infrastructure/interfaces/class";
import { Student } from "@/infrastructure/interfaces/student";
import { Teacher } from "@/infrastructure/interfaces/teacher";
import ClassRepo from "@/infrastructure/local/repo/class.repo";
import StudentRepo from "@/infrastructure/local/repo/student.repo";
import TeacherRepo from "@/infrastructure/local/repo/teacher.repo";

export default class ClassService {

    constructor(private classRepo: ClassRepo, private studentRepo: StudentRepo, private teacherRepo: TeacherRepo) {
    }

    public async create(data: CreateClass) {
        return await this.classRepo.insert(data)
    }

    public async update(id: number, data: Partial<CreateClass>) {
        return await this.classRepo.update(id, data)
    }

    public async delete(id: number) {
        return await this.classRepo.delete(id)
    }

    public async getAll(query?: { include: string[] }) {
        const data = await this.classRepo.getAll()

        let newData = data
        if (query?.include.includes('teachers')) {
            console.log('include teacehr')
            const teacher = await this.teacherRepo.getAll()
            const teacherByClass = new Map<number, Teacher[]>()
            teacher.forEach(item => {
                if (item.class_id) {
                    if (teacherByClass.has(item.class_id)) {
                        teacherByClass.get(item.class_id)?.push(item)
                    } else {
                        teacherByClass.set(item.class_id, [item])
                    }
                }
            })

            newData = newData.map(item => ({ ...item, teachers: teacherByClass.get(item.id) }))
        }
        if (query?.include.includes('students')) {
            // //@ts-expect-error add item in object that not have the type
            // data['students'] = []
            const students = await this.studentRepo.getAll()
            const studentsByClass = new Map<number, Student[]>()
            students.forEach(item => {
                if (item.class_id) {
                    if (studentsByClass.has(item.class_id)) {
                        studentsByClass.get(item.class_id)?.push(item)
                    } else {
                        studentsByClass.set(item.class_id, [item])
                    }
                }
            })

            newData = newData.map(item => ({ ...item, students: studentsByClass.get(item.id) }))
        }

        return newData
    }
}