import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    try {
        if (!courseId) {
            const mentors = await prisma.User.findMany({
                where: {
                    role: "MENTOR",
                },
                select: {
                    id: true, name: true, registrations: true, participations: true, status: true
                }
            })

            return NextResponse.json(mentors)
        }

        const mentors = await prisma.User.findMany({
            where: {
                OR: [
                    {
                        participations: {
                            some: { courseId: Number(courseId) }
                        }
                    },
                    {
                        registrations: {
                            some: { courseId: Number(courseId) }
                        }
                    }
                ]
            }
        })
        return NextResponse.json(mentors)

    } catch (error) {
        console.error("Hiba történt a mentorok lekérdezésekor:", error)
        return NextResponse.json({ message: "Szerverhiba" }, { status: 500 })
    }
}
