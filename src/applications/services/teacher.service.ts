import schemaValidation from "@/infrastructure/helper/schema-validation";
import { CreateTeacher, TeacherWithClass, UpdateTeacher } from "@/infrastructure/interfaces/teacher";
import ClassRepo from "@/infrastructure/local/repo/class.repo";
import TeacherRepo from "@/infrastructure/local/repo/teacher.repo";
import z from "zod";


export default class TeacherService {
    constructor(private teacherRepo: TeacherRepo, private classRepo: ClassRepo) { }

    public async create(body: CreateTeacher) {
        //input validation
        const validatedData = schemaValidation(body, {
            full_name: z.string(),
            identity_number: z.coerce.number().min(1),
            address: z.string(),
            gender: z.string(),
            subjects: z.string(),
            class_id: z.coerce.number().min(1).optional().nullable()
        })

        const data = await this.teacherRepo.insert(validatedData)

        //return with class relation
        const dataWithClass: TeacherWithClass = { ...data, class: null }
        if (data?.class_id) {
            const getClass = (await this.classRepo.getById(data.class_id)) || null
            dataWithClass.class = getClass
        }

        return dataWithClass
    }


    public async update(id: number, body: UpdateTeacher) {

        const validatedData = schemaValidation(body, {
            full_name: z.string().optional(),
            identity_number: z.coerce.number().min(1).optional(),
            address: z.string().optional(),
            gender: z.string().optional(),
            subjects: z.string().optional(),
            class_id: z.coerce.number().min(1).optional().nullable()
        })

        return await this.teacherRepo.update(id, validatedData)
    }

    public async getAll() {
        return await this.teacherRepo.getAllWithClass()
    }


    public async delete(id: number) {
        return await this.teacherRepo.delete(id)
    }
}