'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type AuthContextType = {
  token: string | null
  role: string | null
  userId: number | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]))
        setToken(storedToken)
        setRole(payload.role)
        setUserId(payload.id)
      } catch (e) {
        logout()
      }
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    const payload = JSON.parse(atob(newToken.split(".")[1]))
    setToken(newToken)
    setRole(payload.role)
    setUserId(payload.id)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setRole(null)
    setUserId(null)
  }

  return (
    <AuthContext.Provider value={{
      token,
      role,
      userId,
      isAuthenticated: !!token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}