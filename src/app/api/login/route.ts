import { NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return NextResponse.json({ error: "Nem található ilyen felhasználó" }, { status: 404 })
    }

    const passwordCheck = await compare(password, user.password)

    if (!passwordCheck) {
        return NextResponse.json({ error: 'Hibás email vagy jelszó' }, { status: 401 })
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )


    return NextResponse.json({token}, { status: 200 })
}        




