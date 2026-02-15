import { ErrorInterface } from "./error"

export default async function responseApiHandler<T>(action: () => Promise<({ successCode: number, item?: T, data?: T[] })>) {
    try {
        const { successCode, ...response } = await action()

        return Response.json({ message: 'success', ...response }, { status: successCode || 200 })
    } catch (error) {
        const _error = error as ErrorInterface

        return Response.json({ message: _error.message, errors: _error.details }, { status: _error.code || 500 })
    }
}