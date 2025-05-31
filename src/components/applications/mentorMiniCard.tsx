import { User } from "@/app/types/types"

type Props = {
    mentor: User
}

const MiniCard = ({mentor}: Props) => {
    return (
        <div className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow p-4 
        hover:bg-blue-50 transition w-full max-w-xs mx-auto">
      <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Státusz: {mentor.status === "ACTIVE" ? "Aktív" : "Inaktív"}
      </p>
    </div>
  )
    
}

export default MiniCard