import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signup(email, password, nombre)
      nav('/')
    } catch (err) {
      setError(err.message || JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="text-center mb-6"><Logo className="mx-auto" /></div>
      <form onSubmit={handle} className="bg-white p-6 rounded shadow">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Nombre</span>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Tu nombre" />
        </label>
        <label className="block mb-2">
          <span className="text-sm">Correo</span>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="correo@ejemplo.com" />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Contraseña</span>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
        </label>
        <button disabled={loading} className="w-full bg-ice-500 text-white py-2 rounded">
          {loading ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>
    </div>
  )
}
