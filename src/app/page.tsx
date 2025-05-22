'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
  
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const loginData = { email, password }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })

    const data = await response.json()

    if(response.ok){
      console.log(data.message)
      router.push("/home")
    }else{
      console.log(data.error)
    }
  }

  return (
    <div className="flex items-center justify-center w-full lg:p-12">
      <div className="flex items-center xl:p-10">
        <form onSubmit={handleLogin} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
          <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Bejelentkezés</h3>
          <p className="mb-4 text-grey-700">Add meg a Email címed és jelszavad</p>

          <button
            type="button"
            className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 
            bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
            <img
              className="h-5 mr-2"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
              alt="Google logo" />
            Bejelentkezés Google fiókkal
          </button>

          <div className="flex items-center mb-3">
            <hr className="h-0 border-b border-solid border-grey-500 grow" />
            <p className="mx-4 text-grey-600">vagy</p>
            <hr className="h-0 border-b border-solid border-grey-500 grow" />
          </div>

          <div className="relative mb-8">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer block w-full appearance-none border-2 border-gray-300 bg-transparent px-2.5 pt-5 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 rounded-lg"
              onChange={e => setEmail(e.target.value)}
              required />

            <label
              htmlFor="email"
              className="absolute left-2.5 top-2 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-700 bg-white px-2 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600">
              Email:
            </label>
          </div>

          <div className="relative mb-8">
            <input
              type="password"
              id="password"
              placeholder=" "
              className="peer block w-full appearance-none border-2 border-gray-300 bg-transparent px-2.5 pt-5 pb-2.5 
              text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 rounded-lg"
              onChange={e => setPassword(e.target.value)}
              required />

            <label
              htmlFor="password"
              className="absolute left-2.5 top-2 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-700 bg-white px-2 transition-all 
              duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 
              peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600">
              Jelszó:
            </label>
          </div>


          <div className="flex flex-row justify-between mb-8">
            <label className="inline-flex items-center cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4" />

              <span className="ml-3 text-sm font-normal text-grey-900 hover:text-[#0074B8]">
                Maradjak bejelntkezve
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-purple-blue-500 hover:underline hover:text-[#0074B8]">
              Elfelejtett jelszó?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none transition duration-300 md:w-96 
          rounded-2xl bg-[#00AEEF] text-white hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 
          hover:bg-[#0074B8]">
            Bejelentkezés
          </button>

          <p className="flex justify-center text-sm leading-relaxed text-grey-900 gap-2">
            Még nincs regisztrációd?
            <Link href="/registration">
              <p className="font-bold text-grey-700 hover:underline hover:text-[#0074B8]">
                Itt tudsz regisztránli
              </p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
