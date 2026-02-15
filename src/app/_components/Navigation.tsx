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
        <nav className="p-5 bg-amber-50 flex justify-between">
            <div>
                <Link href={'/'} tabIndex={0}>
                    <Button type={pathname == ('/') ? 'primary' : 'link'} size="large">Home</Button>
                </Link>
                <Link href={'/class'} tabIndex={0}>
                    <Button type={pathname.includes('/class') ? 'primary' : 'link'} size="large">Kelas</Button>
                </Link>
                <Link href={'/students'} tabIndex={0}>
                    <Button type={pathname.includes('/students') ? 'primary' : 'link'} size="large">Siswa</Button>
                </Link>
                <Link href={'/teachers'} tabIndex={0}>
                    <Button type={pathname.includes('/teachers') ? 'primary' : 'link'} size="large">Guru</Button>
                </Link>
            </div>
            <form action={formAction}>
                <Button type='dashed' danger size="large" htmlType="submit" loading={isPending}>Logout</Button>
            </form>
        </nav>
    )
}