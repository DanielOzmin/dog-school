import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    try {
        const mentors = await prisma.User.findMany({
            where: {
                participations: {
                    some: { courseId: Number(courseId) }
                }
            },
            select: {id: true, name: true, status: true}
        })
        return NextResponse.json(mentors)

    } catch (error) {
        console.error("Hiba történt a mentorok lekérdezésekor:", error)
        return NextResponse.json({ message: "Szerverhiba" }, { status: 500 })
    }
}

export async function POST(req: Request){
    try {
        const body = await req.json()
        const { userId, courseId } = body

        const existing = await prisma.participation.findFirst({
            where: { userId, courseId }
        })

        if (existing) {
            return NextResponse.json({ message: "Már hozzá van adva ehhez a tanfolyamhoz." }, { status: 400 })
        }

        await prisma.participation.create({
            data: {userId: userId, courseId: courseId}
        })


        return NextResponse.json({message: "Sikeresen hozzádtad a tanfolyamhoz a mentort"}, {status:201})
    } catch (error) {
        console.error("hiba történt", error)
        return NextResponse.json({message: "Nemsikerült hozzáadni a mentort a tanfolyamhoz"}, {status:500})
    }
}

export async function DELETE(req:Request){
    try {
        const body = await req.json()
        const { userId, courseId } = body
        
        const existing = await prisma.participation.findFirst({
            where: { userId, courseId }
        })

        if (!existing) {
            return NextResponse.json({ message: "Nincs a mentorok között nem tudod törölni." }, { status: 400 })
        }

        await prisma.participation.delete({
            where: {id: existing.id}
        })
        return NextResponse.json({message: "Sikeresen törölted a tanfolyamról a mentort"}, {status:201})
    } catch (error) {
        console.error("hiba történt", error)
        return NextResponse.json({message: "Nemsikerült törölni a mentort a tanfolyamról"}, {status:500})
    }
}