'use client'

import { Course, User } from "../../app/types/types"
import { useEffect, useState } from "react"
import CourseCard from "../courses/courseCard"
import MiniCard from "./mentorMiniCard"

const fetchReg = async (id: number) => {
    const res = await fetch(`/api/registration?courseId=${id}`)
    const data = await res.json()
    return data
}

const fetchApp = async (id: number) => {
    const res = await fetch(`/api/participation?courseId=${id}`)
    const data = await res.json()
    return data
}


const AdminApplications = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
    const [courseApplicants, setCourseApplicants] = useState<User[]>([])
    const [courseMentors, setCourseMentors] = useState<User[]>([])

    const handleAppsAndRegs = async (id: number) => {
        const mentors = await fetchApp(id)
        setCourseMentors(mentors)
        const applicants = await fetchReg(id)
        setCourseApplicants(applicants)
    }

    const getCourses = async () => {
        const response = await fetch("/api/courses?status=upcoming")
        const data = await response.json()
        setCourses(data)
    }

    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        if (currentCourse) {
            handleAppsAndRegs(currentCourse.id)
        }
    }, [currentCourse])

    const handleMentorClick = async (id: number) => {


        const isMentor = courseMentors.some(m => m.id === id)
        if (isMentor) {

            await fetch("/api/participation", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, courseId: currentCourse?.id }),
            })
            await fetch("/api/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, courseId: currentCourse?.id }),
            })

            refreshMentorLists()
        } else {

            await fetch("/api/participation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, courseId: currentCourse?.id }),
            })

            await fetch("/api/registration", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, courseId: currentCourse?.id }),
            })
            refreshMentorLists()
        }

    }

    const refreshMentorLists = async () => {
        if (!currentCourse?.id) return

        handleAppsAndRegs(currentCourse.id)

        const res3 = await fetch(`/api/courses?status=${currentCourse.id}`)
        const data3 = await res3.json()
        setCurrentCourse(data3)

    }

    const refreshCourses = () => {
        getCourses()
        setCurrentCourse(null)
    }

    return (
        <>
            {currentCourse &&
                <button
                    className="w-full mt-4 sm:w-48 px-6 py-4 text-sm font-bold leading-none transition 
                    duration-300 rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] focus:ring-4 
                    focus:ring-blue-100"
                    onClick={refreshCourses}>
                    <span className="mr-2">←</span> Vissza
                </button>}
            <div className="flex flex-col gap-10 mt-10 mx-auto px-10 w-full max-w-screen-lg">
                {currentCourse ? (
                    <div>
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            <section className="flex-1">
                                <h2 className="text-xl font-bold mb-4">Kiválasztott tanfolyam</h2>
                                <CourseCard course={currentCourse} />
                            </section>
                            <section className="flex-1">
                                <h2 className="text-xl font-bold mb-4">Kiválasztott mentorok</h2>
                                {courseMentors.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {courseMentors.map((mentor) => (
                                            <div key={mentor.id} onClick={() => handleMentorClick(mentor.id)}>
                                                <MiniCard mentor={mentor} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>Jelenleg nincs kiválasztott mentor erre a tanfolyamra.</div>
                                )}
                            </section>
                        </div>
                        <section>
                            <h3 className="text-xl font-bold my-8">Jelentkezők</h3>
                            {courseApplicants.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {courseApplicants.map((mentor) =>
                                        <div key={mentor.id} onClick={() => handleMentorClick(mentor.id)}>
                                            <MiniCard mentor={mentor} />
                                        </div>)}
                                </div>

                            ) : (<div>Jelenleg nincs jelentkező erre a tanfolyamra.</div>)}

                        </section>
                    </div>
                ) : (<>
                    {courses.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold mb-4">Kattints a tanfolyamra!</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map(course => (
                                    <div key={course.id} onClick={() => setCurrentCourse(course)}>
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
                )}
            </div>
        </>
    )
}

export default AdminApplications