import { teacherService } from "@/applications/container";
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler";
import tokenValidationApiHandler from "@/infrastructure/helper/token-validation-api-handler";
import { CreateTeacher } from "@/infrastructure/interfaces/teacher";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => (
    await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            const data = await teacherService.getAll()

            return { successCode: 200, data }
        }
    )
)

export const POST = async (request: NextRequest) => (
    await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            const body = await request.json()

            const item = await teacherService.create(body as CreateTeacher)

            return { successCode: 201, item }
        }
    )
)