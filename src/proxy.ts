import { NextResponse, NextRequest } from 'next/server'
import { validateToken } from './infrastructure/helper/validate-token'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (request.url.includes('/api')) {
        // console.log('api')
        return NextResponse.next()
    } else {
        // console.log(request.url)
        const tokenValue = await validateToken(token)
        if (request.url.includes('/login')) {
            if (tokenValue) return NextResponse.redirect(new URL("/", request.url))
            else return NextResponse.next()
        } else {
            if (tokenValue) return NextResponse.next()
            else return NextResponse.redirect(new URL("/login", request.url))
        }
    }

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)',],
}