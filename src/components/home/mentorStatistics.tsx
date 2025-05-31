'use client'
import { useEffect, useState } from "react"
import MentorTable from "./mentortable"
import { User } from "../../app/types/types"


const MentorStatistics = () => {
    const [mentors, setMentors] = useState<User[]>([])

    useEffect(() => {
        const getAllMentors = async () => {
            const response = await fetch("/api/mentors", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            if (response.ok) {
                setMentors(data)
            }
        }
        getAllMentors()
    }, [])
    
    return (
        <div className="w-full max-w-4xl px-4 mx-auto mt-10">
            <MentorTable mentors={mentors} />
        </div>
    )
}
export default MentorStatistics