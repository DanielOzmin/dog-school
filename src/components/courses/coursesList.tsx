import { View } from "@/app/types/types"
import { Course } from "@/app/types/types"
import { useEffect, useState } from "react"
import CourseCard from "./courseCard"

type Props = {
    setView: React.Dispatch<React.SetStateAction<View>>
}

const CoursesList = ({ setView }: Props) => {
    const [courses, setCourses] = useState<Course[]>([]) // bontsd ketté aktuális éppen futó illetve későbbi tanfolyamok

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses", {
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

    return (
        <>
            <button className="w-full px-6 py-5 mt-5 text-sm font-bold leading-none transition 
                        duration-300 md:w-24 rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] 
                        focus:ring-4 focus:ring-blue-100" onClick={() => setView("None")}>Vissza</button>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

        </>
    )

}

export default CoursesList