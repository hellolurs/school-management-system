import { teacherService } from "@/applications/container";
import { AuthError, ErrorInterface, ValidationError } from "@/infrastructure/helper/error";
import { validateToken } from "@/infrastructure/helper/validate-token";
import { UpdateTeacher } from "@/infrastructure/interfaces/teacher";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        //token validation
        const token = request.headers.get('authorization')
        if (!validateToken(token)) throw new AuthError('Unauthorized')

        const id = Number((await params).id)
        //validate id
        if (isNaN(id)) throw new ValidationError('Invalid id')

        const body = await request.json();

        const data = await teacherService.update(id, body as UpdateTeacher)

        return Response.json({ message: 'success', data }, { status: 200 })
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

        await teacherService.delete(id)

        return Response.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message, errors: _error.details }, { status: _error.code })
    }
}