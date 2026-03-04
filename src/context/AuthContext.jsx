import { createContext, useContext, useState, useEffect } from 'react'
import { loginAPI, registerAPI, decodeToken } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('kol_token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) setUser(decoded)
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const res = await loginAPI(email, password)
    localStorage.setItem('kol_token', res.token)
    localStorage.setItem('kol_user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  async function register(data) {
    const res = await registerAPI(data)
    localStorage.setItem('kol_token', res.token)
    localStorage.setItem('kol_user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  function logout() {
    localStorage.removeItem('kol_token')
    localStorage.removeItem('kol_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}