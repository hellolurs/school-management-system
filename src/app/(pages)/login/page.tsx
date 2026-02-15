'use client'

import { Button, Input } from "antd"
import Password from "antd/es/input/Password"
import { redirect } from "next/navigation"
import { useActionState } from "react"

const LoginPage = () => {
    const actionSubmitLogin = async (_: unknown, formData: FormData) => {
        const body = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(body), credentials: 'include' })
        const resJson = await res.json()

        if (res.ok) {
            redirect('/')
        }

        return resJson
    }

    const [state, formAction, isPending] = useActionState(actionSubmitLogin, null)

    return (
        <div className="min-h-screen flex">
            <div className="bg-gray-100 m-auto p-2 rounded-lg w-80">
                <form action={formAction} className="bg-gray-50 p-8">
                    <h1 className="text-3xl">Login</h1>
                    <br />
                    <div className="mb-5">
                        <label htmlFor="email" className="block">Email</label>
                        <Input type="email" name="email" size="large" status={state?.error ? 'error' : undefined} />
                        <br />
                        <br />
                        <label htmlFor="email" className="block">Password</label>
                        <Password type="password" name="password" size="large" />
                    </div>
                    {state?.error ? <p className="text-red-500">{state.error}</p> : null}
                    <br />
                    {/* <button className="bg-indigo-900 px-4 py-2 rounded-md cursor-pointer">Login</button> */}
                    <Button type="primary" size="large" block htmlType="submit" loading={isPending}>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage