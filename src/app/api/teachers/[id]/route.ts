import { teacherService } from "@/applications/container";
import { ValidationError } from "@/infrastructure/helper/error";
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler";
import tokenValidationApiHandler from "@/infrastructure/helper/token-validation-api-handler";
import { UpdateTeacher } from "@/infrastructure/interfaces/teacher";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            //validate id
            const id = Number((await params).id)
            if (isNaN(id)) throw new ValidationError('Invalid id')

            const body = await request.json();

            const item = await teacherService.update(id, body as UpdateTeacher)

            return { successCode: 200, item }
        }
    )
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            //validate id
            const id = Number((await params).id)
            if (isNaN(id)) throw new ValidationError('Invalid id')

            await teacherService.delete(id)

            return { successCode: 200 }
        }
    )
}