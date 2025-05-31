'use client'

import CoursesList from "@/components/courses/coursesList"
import CreateCourse from "@/components/courses/createCourse"
import { useState } from "react"
import { View } from "../types/types"
import { useAuth } from "../context/authContext"

const buttonStyle = "w-full max-w-sm px-6 py-4 mb-4 text-base font-semibold rounded-2xl text-white bg-[#00AEEF] hover:bg-[#0074B8] transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100"


const CoursesPage=()=>{
    const { isAuthenticated} = useAuth()
    const [view, setView] = useState<View>("None")

    if (!isAuthenticated){ 
      return (
      <div className="flex justify-center items-center mt-12">
          <h1 className="text-2xl font-bold uppercase text-center">
              Be kell jelentkezned!
          </h1>
      </div>
      )
  }

    return (
        <main>
            {view === "None" && (
                <div className="flex flex-wrap gap-4 justify-center items-center w-full p-4 mt-12">
                <button className={`${buttonStyle} flex-1 min-w-[220px] max-w-sm`} onClick={() => setView("List")}>
                  Tanfolyamok
                </button>
                <button className={`${buttonStyle} flex-1 min-w-[220px] max-w-sm`} onClick={() => setView("Create")}>
                  Tanfolyam létrehozása
                </button>
              </div>)}
            {view === "Create" && <CreateCourse setView={setView}/>}
            {view === "List" && <CoursesList setView={setView}/>}  
        </main>
    
)
}

export default CoursesPage