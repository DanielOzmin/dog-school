'use client'

import CoursesList from "@/components/courses/coursesList"
import CreateCourse from "@/components/courses/createCourse"
import { useState } from "react"
import { View } from "../types/types"

const buttonStyle = "w-full px-6 py-5 mb-5 text-sm font-bold leading-none transition duration-300 md:w-96 rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] focus:ring-4 focus:ring-blue-100"


const CoursesPage=()=>{
    const [view, setView] = useState<View>("None")

    return (
        <main>
            {view === "None" && (
                <div className="flex gap-12 justify-center items-center w-full lg:p-36">
                <button className={buttonStyle} onClick={()=>setView("List")}>Tanfolyamok</button>
                <button className={buttonStyle} onClick={()=>setView("Create")}>Tanfolyam létrehozása</button>
                </div>)}
            {view === "Create" && <CreateCourse setView={setView}/>}
            {view === "List" && <CoursesList setView={setView}/>}
            
        </main>
    
)
}

export default CoursesPage