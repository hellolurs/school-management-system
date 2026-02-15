import { cookies } from "next/headers";
import { envConfig } from "../config/env.config";
import jwt from 'jsonwebtoken'

export async function validateToken(token?: string | null) {
    const cookieToken = (await cookies()).get('token')?.value
    if (cookieToken) token = cookieToken

    if (!token) return null

    try {
        const _token = token.includes('Bearer ') ? token.split('Bearer ')[1] : token
        const result = jwt.verify(_token, envConfig.JWT_SECRET)

        return result
    } catch (error) {
        // console.error(error)
        return null
    }
}