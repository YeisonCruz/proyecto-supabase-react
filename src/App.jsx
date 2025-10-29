import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Productos from './pages/Productos.jsx'
import Ingredientes from './pages/Ingredientes.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContext.jsx'

function RoleRoute({ allowed, children }) {
  const { role, loading } = useAuth()
  if (loading) return <div className="p-6">Cargando...</div>
  if (!allowed.includes(role)) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ingredientes" element={
            <RoleRoute allowed={['admin','empleado']}>
              <Ingredientes />
            </RoleRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}
