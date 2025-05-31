import { User } from "../../app/types/types"


type Props = {
    mentors: User[]
}

const MentorTable = ({mentors} : Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
                <thead className="bg-[#0098DB] text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Név</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Jelentkezések</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Részvételek</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase">Státusz</th>
                    </tr>
                </thead>
                <tbody>
                    {mentors.map((mentor, index) => (
                        <tr
                            key={mentor.id}
                            className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                            <td className="px-6 py-4 text-sm text-gray-800 font-medium">{mentor.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{mentor.registrations?.length ?? 0}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{mentor.participations?.length ?? 0}</td>
                            <td className="px-6 py-4 text-sm text-gray-800 font-medium">{mentor.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MentorTable