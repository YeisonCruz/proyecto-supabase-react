import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, role, signout } = useAuth()
  const nav = useNavigate()

  const handleLogout = async () => {
    await signout()
    nav('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/"><Logo /></Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm">Productos</Link>
          {role !== 'public' && <Link to="/productos" className="text-sm">Mis Productos</Link>}
          {role === 'admin' || role === 'empleado' ? (
            <Link to="/ingredientes" className="text-sm">Inventario</Link>
          ) : null}
          {user ? (
            <>
              <span className="text-sm px-3 py-1 rounded bg-ice-100 text-ice-500">{role}</span>
              <button onClick={handleLogout} className="text-sm text-red-500">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Iniciar sesión</Link>
              <Link to="/register" className="text-sm">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
