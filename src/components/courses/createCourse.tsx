'use client'

import { View } from "@/app/types/types"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { useState } from "react"

const locations = ["Őrmező", "Hajógyári", "Népsziget"]

type Props = {
    setView: React.Dispatch<React.SetStateAction<View>>
}

const CreateCourse = ({ setView }: Props) => {
    const [name, setName] = useState<string>('')
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate] = useState<string>()
    const [time, setTime] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const courseData = { name, startDate, endDate, time }

        const response = await fetch("/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData)
        })

        const data = await response.json()
        if (response.ok) {
            setMessage(data.message)
        } else {
            setMessage(data.error || "Ismeretlen hiba")
        }
    }

    return (
        <>
            <button className="w-full px-6 py-5 mt-5 text-sm font-bold leading-none transition 
                        duration-300 md:w-24 rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] 
                        focus:ring-4 focus:ring-blue-100" onClick={() => setView("None")}>Vissza</button>
            <div className="flex items-center justify-center w-full lg:p-12">
                <div className="flex items-center xl:p-10">
                    <form onSubmit={handleSubmit}
                        className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                        <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Tanfolyam létrehozása</h3>
                        <p className="mb-4 text-grey-700">Add meg a helyszínt és az időpontokat</p>

                        <div className="relative mb-8 text-left px-6">
                            <label className="block mb-2 text-sm text-gray-700">Helyszín</label>
                            <Listbox value={name} onChange={setName}>
                                <div className="relative">
                                    <ListboxButton className="w-full py-2.5 px-4 text-sm border-2 border-gray-300 
                                rounded-lg bg-white text-left focus:border-blue-600 focus:outline-none">
                                        {name || 'Válassz helyszínt'}
                                    </ListboxButton>
                                    <ListboxOptions className="absolute z-100 mt-1 w-full rounded-lg bg-white 
                                shadow-lg border border-gray-300">
                                        {locations.map((loc) => (
                                            <ListboxOption
                                                key={loc}
                                                value={loc}
                                                className={({ active }) => `cursor-pointer select-none px-4 
                                            py-2 text-sm ${active ? 'bg-blue-100' : ''}`}>
                                                {loc}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        <div className="relative mb-8 px-6">
                            <input
                                type="time"
                                placeholder=" "
                                className="peer block w-full border-2 border-gray-300 bg-transparent px-2.5 pt-5 
                            pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none rounded-lg"
                                onChange={(e) => setTime(e.target.value)}
                                value={time}
                                required />
                            <label className="absolute left-8 top-2 z-10 origin-[0] -translate-y-3 scale-75 
                        transform text-sm text-gray-700 bg-white px-2 transition-all duration-200 
                        peer-placeholder-shown:top-6 peer-placeholder-shown:scale-100 peer-focus:top-2 
                        peer-focus:scale-75 peer-focus:text-blue-600">
                                Kezdési időpont
                            </label>
                        </div>

                        <div className="relative mb-8 px-6">
                            <input
                                type="date"
                                placeholder=" "
                                className="peer block w-full border-2 border-gray-300 bg-transparent 
                            px-2.5 pt-5 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none 
                            rounded-lg"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                                required />
                            <label className="absolute left-8 top-2 z-10 origin-[0] -translate-y-3 scale-75 
                        transform text-sm text-gray-700 bg-white px-2 transition-all duration-200 
                        peer-placeholder-shown:top-6 peer-placeholder-shown:scale-100 peer-focus:top-2 
                        peer-focus:scale-75 peer-focus:text-blue-600">
                                Kezdési dátum
                            </label>
                        </div>

                        <div className="relative mb-8 px-6">
                            <input
                                type="date"
                                placeholder=" "
                                className="peer block w-full border-2 border-gray-300 bg-transparent px-2.5 pt-5 
                            pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none rounded-lg"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                                required />
                            <label className="absolute left-8 top-2 z-10 origin-[0] -translate-y-3 scale-75 
                        transform text-sm text-gray-700 bg-white px-2 transition-all duration-200 
                        peer-placeholder-shown:top-6 peer-placeholder-shown:scale-100 peer-focus:top-2 
                        peer-focus:scale-75 peer-focus:text-blue-600">
                                Befejezési dátum
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none transition 
                        duration-300 md:w-96 rounded-2xl bg-[#00AEEF] text-white hover:bg-[#0074B8] 
                        focus:ring-4 focus:ring-blue-100">
                            Tanfolyam létrehozása
                        </button>

                        {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCourse