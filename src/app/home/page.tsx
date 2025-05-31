'use client'

import MentorStatistics from "@/components/home/mentorStatistics"
import { useAuth } from "../context/authContext"


const HomePage = () => {
    const { role, isAuthenticated } = useAuth()

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
            {role === "ADMIN" && <MentorStatistics />}
            {role === "MENTOR" && <h1>Hello mentor</h1>}
            
        </main>
    )
}

export default HomePage