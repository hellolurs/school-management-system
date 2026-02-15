import { studentService } from "@/applications/container"
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler"
import tokenValidationApiHandler from "@/infrastructure/helper/token-validation-api-handler"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            const data = await studentService.getAll()

            return { successCode: 200, data }
        }
    )
}

export async function POST(request: NextRequest) {
    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            const body = await request.json();

            const item = await studentService.create(body)

            return { successCode: 201, item }
        }
    )

}