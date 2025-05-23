import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="bg-[#0098DB] text-white">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link href="/home">
                    <Image src="/footer_logo.jpg" alt="logo" width={150} height={150} />
                </Link>
                <ul className="flex gap-8 text-base font-medium">
                    <li><Link className="hover:underline underline-offset-4" href="/home">Főoldal</Link></li>
                    <li><Link className="hover:underline underline-offset-4" href="/courses">Tanfolyamok</Link></li>
                    <li><Link className="hover:underline underline-offset-4" href="/applications">Jelentkezések</Link></li>
                    <li><Link className="hover:underline underline-offset-4" href="/">Kijelentkezés</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar