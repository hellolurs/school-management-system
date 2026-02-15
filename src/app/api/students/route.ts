import { studentService } from "@/applications/container"
import { AuthError, ErrorInterface } from "@/infrastructure/helper/error"
import { validateToken } from "@/infrastructure/helper/validate-token"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    // const cookieStore = await cookies()
    // const refresh_token = cookieStore.get('token')

    //token validation
    const token = request.headers.get('authorization')
    const tokenPayload = validateToken(token)
    if (!tokenPayload) return Response.json({ message: 'error', error: 'Unauthorized' }, { status: 401 })

    //
    const data = await studentService.getAll()


    return Response.json({ message: 'success', data }, { status: 200 })
}

export async function POST(request: NextRequest) {
    try {
        //token validation
        const token = request.headers.get('authorization')
        if (!validateToken(token)) throw new AuthError('Unauthorized')

        const body = await request.json();

        const data = await studentService.create(body)

        return Response.json({ message: 'success', data }, { status: 201 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message, errors: _error.details }, { status: _error.code })
    }

}