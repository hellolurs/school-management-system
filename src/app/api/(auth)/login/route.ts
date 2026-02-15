import { authService } from "@/applications/container";
import responseApiHandler from "@/infrastructure/helper/rensponse-api-handler";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    return await responseApiHandler(
        async () => {
            const item = await authService.login(body)

            //cookies set
            const cookieStore = await cookies()
            cookieStore.set("token", item.token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 })

            return { successCode: 200, item }
        }
    )
}