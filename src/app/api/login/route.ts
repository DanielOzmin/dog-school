import { NextResponse } from 'next/server'

export async function POST(req: Request){
    const body = await req.json()
    const { email, password } = body

    const testEmail = 'test@gmail.com'
    const testPassword = 'password123'

    if(email === testEmail && password === testPassword){
        return NextResponse.json({ message: "Sikeres bejelentkezés"}, {status: 200})
    }

    return NextResponse.json({ error: 'Hibás email vagy jelszó' }, { status: 401 })
}