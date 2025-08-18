import axios from 'axios'
import { useState } from 'react'
import { apiUrl } from '../constants/apiUrl'
import { useNavigate } from 'react-router-dom'
import type { APIUser } from '../types/apiTypes'

export default function useLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function login(email: string, password: string) {
    if (!email.trim().length || !password) {
      throw 'All fields are required'
    }
    setLoading(true)
    try {
      const res = await axios.post(`${apiUrl}/login`, { email, password })
      const { data: user } = res as { data: APIUser }
      if (user) {
        localStorage.setItem('token', user.token)
        navigate('/', { replace: true })
      }
    } catch (error) {
      throw new Error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, login }
}
