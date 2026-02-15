import { envConfig } from "@/infrastructure/config/env.config";
import { AuthError } from "@/infrastructure/helper/error";
import { generateToken } from "@/infrastructure/helper/generate-token";
import schemaValidation from "@/infrastructure/helper/schema-validation";
import z from "zod";

export class AuthService {
    public async login(data: { email: string, password: string }) {
        const { email, password } = data

        //body validation
        schemaValidation(data, {
            email: z.email(),
            password: z.string(),
        })

        //check credential
        if (email == envConfig.ADMIN_EMAIL && password == envConfig.ADMIN_PASSWORD) {
            return { token: generateToken({ email, role: 'admin' }) }
        }

        throw new AuthError('Username atau password salah!')
    }
}