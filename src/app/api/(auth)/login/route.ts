import { authService } from "@/applications/container";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body

    //body validation
    const validation = z.object({
        email: z.email(),
        password: z.string(),
    }).safeParse(body)

    if (!validation.success) {
        return Response.json({ message: "error", error: "Validasi input gagal!", errorDetail: z.treeifyError(validation.error).properties }, { status: 400 });
    }

    //credential check
    const data = await authService.login({ username: email, password })
    if (data?.token) {
        //cookies set
        const cookieStore = await cookies()
        cookieStore.set("token", data.token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 })

        return Response.json({ message: "success", data: data }, { status: 201 });
    } else {
        return Response.json({ message: "error", error: "Email atau password salah!" }, { status: 401 });
    }
}