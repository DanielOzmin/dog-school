import { View } from "@/app/types/types"
import { Course } from "@/app/types/types"
import { useEffect, useState } from "react"
import CourseCard from "./courseCard"

type Props = {
    setView: React.Dispatch<React.SetStateAction<View>>
}

const CoursesList = ({ setView }: Props) => {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses?status=all", {
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

    const currentCourses = courses.filter(c => new Date(c.startDate) < new Date())
    const upcomingCourses = courses.filter(c => new Date(c.startDate) > new Date())
    const pastCourses = courses.filter(c => new Date(c.endDate) < new Date())
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())


    return (
        <>
            <button
                className="w-full mt-4 sm:w-48 px-6 py-4 text-sm font-bold leading-none transition duration-300 
                rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] focus:ring-4 focus:ring-blue-100"
                onClick={() => setView("None")}>
                <span className="mr-2">←</span> Vissza
            </button>

            <div className="flex flex-col gap-10 mt-10 mx-auto px-10 w-full max-w-screen-lg">

                {upcomingCourses.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">Hamarosan induló tanfolyamok</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                )}

                {currentCourses.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">Éppen futó tanfolyamok</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                )}

                {pastCourses.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">Lezárult tanfolyamok</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                )}

            </div>

        </>
    )

}

export default CoursesList