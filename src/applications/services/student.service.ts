import schemaValidation from "@/infrastructure/helper/schema-validation";
import { CreateStudent } from "@/infrastructure/interfaces/student";
import StudentRepo from "@/infrastructure/local/repo/student.repo";
import z from "zod";

export default class StudentService {
    constructor(private studentRepository: StudentRepo) { }

    public async create(body: CreateStudent) {
        const schema = {
            full_name: z.string(),
            identity_number: z.coerce.number().min(1),
            address: z.string(),
            date_birth: z.iso.datetime(),
            place_of_birth: z.string(),
            gender: z.string(),
            religion: z.string(),
            class_id: z.coerce.number().min(1).optional().nullable()
        }
        const validatedData = schemaValidation(body, schema)

        return await this.studentRepository.insert({ ...validatedData, date_birth: new Date(validatedData.date_birth) })
    }

    public async update(id: number, body: Partial<CreateStudent>) {
        const validatedData = schemaValidation(body, {
            full_name: z.string().optional(),
            identity_number: z.coerce.number().min(1).optional(),
            address: z.string().optional(),
            date_birth: z.iso.datetime().optional(),
            place_of_birth: z.string().optional(),
            gender: z.string().optional(),
            religion: z.string().optional(),
            class_id: z.coerce.number().min(1).optional().nullable()
        })

        //date_birth formating to Date
        let dataUpdate = { ...validatedData } as Partial<CreateStudent>
        if (validatedData?.date_birth) {
            dataUpdate = { ...validatedData, date_birth: new Date(validatedData.date_birth) }
        }

        return await this.studentRepository.update(id, dataUpdate)
    }

    public async getAll() {
        return await this.studentRepository.getAllWithClass()
    }

    public async delete(id: number) {
        return await this.studentRepository.delete(id)
    }
}