import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const { name, startDate, endDate, time } = body


        const [hour, minute] = time.split(':').map(Number)
        const startTimeObject = new Date('1970-01-01T00:00:00Z')
        startTimeObject.setUTCHours(hour, minute)

        await prisma.course.create({
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                startTime: startTimeObject
            }
        })
        return NextResponse.json({ message: "Sikeresen létrehoztad a tanfolyamot!" }, { status: 201 })
    } catch (error) {

        console.error("Hiba a tanfolyam létrehozásánál:", error)

        return NextResponse.json({ error: "Hiba történt a létrehozás során" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const courses = await prisma.course.findMany()
        return NextResponse.json(courses)
    } catch (error) {
        return NextResponse.json({ error: "Valami hiba történ a tandfolyamok lekérése során" }, { status: 500 })
    }
}

