import { classService } from "@/applications/container"
import { AuthError } from "@/infrastructure/helper/error"
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler"
import tokenValidationApiHandler from "@/infrastructure/helper/token-validation-api-handler"
import { validateToken } from "@/infrastructure/helper/validate-token"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const include = searchParams.get("include") || '';

    return await responseApiHandler(
        async () => {
            //token validation
            const token = request.headers.get('authorization')
            if (!validateToken(token)) throw new AuthError('Unauthorized')

            const data = await classService.getAll({ include })

            return { successCode: 200, data }
        }
    )

}


export async function POST(request: NextRequest) {
    const body = await request.json();

    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            const item = await classService.create(body)

            return { successCode: 200, item }
        }
    )
}