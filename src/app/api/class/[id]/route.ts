import { classService } from "@/applications/container";
import { ErrorInterface } from "@/infrastructure/helper/error";
import { validateToken } from "@/infrastructure/helper/validate-token";
import { NextRequest } from "next/server";
import z from "zod";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    //token validation
    const token = request.headers.get('authorization')
    const tokenPayload = validateToken(token)
    if (!tokenPayload) return Response.json({ message: 'error', error: 'Unauthorized' }, { status: 401 })

    const body = await request.json();
    const id = Number((await params).id)

    //validate id
    if (isNaN(id)) return Response.json({ message: 'error', erorr: 'Invalid id' }, { status: 401 })

    //input validation
    const validation = z.object({
        name: z.string().optional(),
        description: z.string().optional()
    }).safeParse(body)

    if (!validation.success)
        return Response.json({ message: "error", error: "Validasi input gagal!", errorDetail: z.treeifyError(validation.error).properties }, { status: 400 });

    try {
        const data = await classService.update(id, validation.data)

        return Response.json({ message: 'success', data }, { status: 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message }, { status: _error.code })
    }

}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    //token validation
    const token = request.headers.get('authorization')
    const tokenPayload = validateToken(token)
    if (!tokenPayload) return Response.json({ message: 'error', error: 'Unauthorized' }, { status: 401 })

    const id = Number((await params).id)

    //validate id
    if (isNaN(id)) return Response.json({ message: 'error', erorr: 'Invalid id' }, { status: 401 })

    try {
        await classService.delete(id)

        return Response.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message }, { status: _error.code })
    }
}