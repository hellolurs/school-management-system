import z from "zod"
import { ValidationError } from "./error"

export default function schemaValidation<T, S extends Record<string, z.ZodType>>(data: T, schema: S) {

    const validation = z.object({
        ...schema
    }).safeParse(data)

    if (!validation.success)
        //@ts-expect-error type error cause generic S type
        throw new ValidationError('Validasi input gagal!', z.treeifyError(validation.error).properties)

    return validation.data
}