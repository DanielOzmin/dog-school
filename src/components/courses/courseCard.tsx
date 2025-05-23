import { Course } from "@/app/types/types"
import { CalendarDays, Users } from "lucide-react";

type Props = {
    course: Course
}

const CourseCard = ({ course }: Props) => {

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("hu-HU", { month: "long", day: "numeric" })
    }

    const formatTime = (timeStr: string) => {
        const date = new Date(timeStr)
        return date.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <div className="flex flex-col rounded-3xl shadow-md p-6 w-full max-w-md justify-center items-center
        bg-[#00AEEF] text-white hover:bg-[#0074B8] focus:ring-4 focus:ring-blue-100">
            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
            <div className="text-sm mb-2">
                📅 {formatDate(course.startDate)} – {formatDate(course.endDate)}
            </div>
            <div className="text-sm mb-4">
                🕒 Kezdés: {formatTime(course.startTime)}
            </div>

            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{course.participants?.length ?? 0} mentor</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{course.registrations?.length ?? 0} jelentkező</span>
                </div>
            </div>
        </div>
    )
}

export default CourseCard