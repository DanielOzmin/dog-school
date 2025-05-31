'use client'

import { Course } from "@/app/types/types"
import { useEffect, useState } from "react"
import CourseCard from "../courses/courseCard"
import { useAuth } from "@/app/context/authContext"

const MentorApplications = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const { userId } = useAuth()
    const [message, setMessage] = useState<string>()

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses?status=upcoming", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            const data = await response.json()
            if (response.ok) {
                setCourses(data)
            } else {
                alert("Nem sikertül betölteni a tanfolyamokat :(")
            }
        }
        getCourses()
    }, [])

    const handleApplication = async (id: number) => {
        const response = await fetch("/api/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({courseId: id, userId })
        })
        const data = await response.json()
        if (response.ok) {
            setMessage(data.message)
        } else {
            setMessage(data.message || data.error)
        }
    }

    return (
        <div className="flex flex-col gap-10 mt-10 mx-auto px-10 w-full max-w-screen-lg">
            {courses.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold mb-4">Kattints a tanfolyamra a jelentkezéshez!</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div onClick={() => handleApplication(course.id)}>
                                <CourseCard key={course.id} course={course} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {message && (
                <div className="mt-4 text-green-600 font-semibold">{message}</div>
            )}
        </div>
    )
}

export default MentorApplications