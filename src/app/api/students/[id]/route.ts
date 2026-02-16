import { studentService } from "@/applications/container";
import { AuthError, ErrorInterface, ValidationError } from "@/infrastructure/helper/error";
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler";
import tokenValidationApiHandler from "@/infrastructure/helper/token-validation-api-handler";
import { validateToken } from "@/infrastructure/helper/validate-token";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await responseApiHandler(
        async () => {
            tokenValidationApiHandler(request)

            //validate id
            const id = Number((await params).id)
            if (isNaN(id)) throw new ValidationError('Invalid id')

            const item = await studentService.getById(id)

            return { successCode: 200, item }
        }
    )
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        //token validation
        const token = request.headers.get('authorization')
        if (!validateToken(token)) throw new AuthError('Unauthorized')

        const body = await request.json();
        const id = Number((await params).id)

        //validate id
        if (isNaN(id)) throw new ValidationError('Invalid id')

        const item = await studentService.update(id, body)

        return Response.json({ message: 'success', item }, { status: 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message, errors: _error.details }, { status: _error.code })
    }

}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        //token validation
        const token = request.headers.get('authorization')
        if (!validateToken(token)) throw new AuthError('Unauthorized')

        const id = Number((await params).id)

        //validate id
        if (isNaN(id)) throw new ValidationError('Invalid id')

        await studentService.delete(id)

        return Response.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message, errors: _error.details }, { status: _error.code })
    }
}