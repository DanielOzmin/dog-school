'use client'

import { useAuth } from "../context/authContext"
import AdminApplications from "@/components/applications/adminApllications"
import MentorApplications from "@/components/applications/mentorApplications"


const ApplicationPage = () => {
    const { isAuthenticated,role } = useAuth()

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
            {role === "ADMIN" && <AdminApplications/> }
            {role === "MENTOR" && <MentorApplications/> }
        </main>
    )
}

export default ApplicationPage