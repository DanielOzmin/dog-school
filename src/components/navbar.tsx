'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/context/authContext"

const Navbar = () => {
    const pathName = usePathname()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const { isAuthenticated, logout, role } = useAuth()
    const router = useRouter()

    const navItems = role === "ADMIN" ?[
        { label: "Főoldal", href: "/home" },
        { label: "Tanfolyamok", href: "/courses" },
        { label: "Jelentkezések", href: "/applications" },
    ] : [
        { label: "Főoldal", href: "/home" },
        { label: "Jelentkezések", href: "/applications" },
    ]

    return (
        <nav className="bg-[#0098DB] text-white">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link href="/home">
                    <Image src="/footer_logo.jpg" alt="logo" width={150} height={150} />
                </Link>
                <button className="block md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu size={28} color="#ffffff" />
                </button>
                <ul className="hidden md:flex gap-8 text-base font-medium">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`transition-colors duration-200 ${pathName === item.href
                                    ? "underline underline-offset-8 decoration-2"
                                    : "hover:underline underline-offset-8 decoration-2"}`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {isAuthenticated ?
                            <button
                                onClick={() => {
                                    logout()
                                    router.push("/")
                                }}
                                className="transition-colors duration-200 hover:underline underline-offset-8 
                                decoration-2">
                                Kijelentkezés
                            </button> :
                            <button
                                onClick={() => router.push("/")}
                                className="transition-colors duration-200 hover:underline underline-offset-8 
                                decoration-2">
                                Bejelentkezés
                            </button>
                        }
                    </li>

                </ul>
            </div>

            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center gap-4 pb-4 text-base font-medium bg-[#00AEEF]">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`transition-colors duration-200 ${pathName === item.href
                                    ? "underline underline-offset-8 decoration-2"
                                    : "hover:underline underline-offset-8 decoration-2"}`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    logout()
                                    router.push("/")
                                    setMenuOpen(false)}}
                                className="transition-colors duration-200 hover:underline underline-offset-8 decoration-2">
                                Kijelentkezés
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    router.push("/")
                                    setMenuOpen(false)
                                }}
                                className="transition-colors duration-200 hover:underline underline-offset-8 decoration-2">
                                Bejelentkezés
                            </button>
                        )}
                    </li>
                </ul>

            )}

        </nav>
    )
}

export default Navbar