'use client'

import { Button } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useActionState } from "react"

export default function Navigation() {
    const pathname = usePathname()
    const actionLogout = async () => {
        const res = await fetch('/api/logout', { method: 'POST', credentials: 'include' })
        const resJson = await res.json()

        if (res.ok) {
            window.location.reload()
        }

        return resJson
    }

    const [, formAction, isPending] = useActionState(actionLogout, null)

    return (
        <nav className="p-5 px-8 bg-amber-50 flex items-center justify-between w-full">
            <div className="flex flex-wrap items-center gap-5">
                <div className="bg-amber-200 p-2 rounded-xl flex  flex-col gap-1">
                    <div className="flex gap-1">
                        <span className="block w-4 aspect-square bg-amber-50 rounded-md"></span>
                        <span className="block h-2 w-2 bg-amber-50 rounded-md"></span>
                    </div>
                    <span className="block h-2 w-2 bg-amber-50 rounded-md"></span>
                </div>
                <Link href={'/'} tabIndex={0}>
                    <Button type={pathname == ('/') ? 'primary' : 'link'} size="large" block>Home</Button>
                </Link>
                <Link href={'/class'} tabIndex={0}>
                    <Button type={pathname.includes('/class') ? 'primary' : 'link'} size="large" block>Kelas</Button>
                </Link>
                <Link href={'/students'} tabIndex={0}>
                    <Button type={pathname.includes('/students') ? 'primary' : 'link'} size="large" block>Siswa</Button>
                </Link>
                <Link href={'/teachers'} tabIndex={0}>
                    <Button type={pathname.includes('/teachers') ? 'primary' : 'link'} size="large" block>Guru</Button>
                </Link>
            </div>
            <form action={formAction}>
                <Button type='dashed' danger size="large" block htmlType="submit" loading={isPending}>Logout</Button>
            </form>
        </nav>
    )
}