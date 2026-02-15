import { envConfig } from "@/infrastructure/config/env.config";
import { generateToken } from "@/infrastructure/helper/generate-token";

export class AuthService {

    public async login(data: { username: string, password: string }) {
        const { username, password } = data

        if (username == envConfig.ADMIN_EMAIL && password == envConfig.ADMIN_PASSWORD) {

            return {
                token: generateToken({ username, role: 'admin' })
            }
        } else {
            return null
        }
    }
}