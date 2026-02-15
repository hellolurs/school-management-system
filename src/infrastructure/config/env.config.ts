

export const envConfig = {
    DATABASE_URL: process.env.DATABASE_URL,
    //
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET ?? "secret"
}