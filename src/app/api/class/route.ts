import { classService } from "@/applications/container"
import { validateToken } from "@/infrastructure/helper/validate-token"
import { NextRequest } from "next/server"
import z from "zod"

export async function GET(request: NextRequest) {
    //token validation
    const token = request.headers.get('authorization')
    const tokenPayload = await validateToken(token)
    if (!tokenPayload) return Response.json({ message: 'error', error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url);
    const include = searchParams.get("include");
    //
    const data = await classService.getAll({ include: include?.replace(' ', '')?.split(',') ?? [] })


    return Response.json({ message: 'success', data }, { status: 200 })
}


export async function POST(request: NextRequest) {
    //token validation
    const token = request.headers.get('authorization')
    const tokenPayload = validateToken(token)
    if (!tokenPayload) return Response.json({ message: 'error', error: 'Unauthorized' }, { status: 401 })

    const body = await request.json();

    //input validation
    const validation = z.object({
        name: z.string(),
        description: z.string().optional()
    }).safeParse(body)

    if (!validation.success)
        return Response.json({ message: "error", error: "Validasi input gagal!", errorDetail: z.treeifyError(validation.error).properties }, { status: 400 });

    const data = await classService.create(validation.data)

    if (data === null) {
        return Response.json({ message: 'error', error: `Kelas dengan nama ${validation.data.name} sudah ada` }, { status: 400 })
    }

    return Response.json({ message: 'success', data }, { status: 201 })
}