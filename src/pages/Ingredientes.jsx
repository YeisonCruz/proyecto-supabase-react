import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])
  const [nombre, setNombre] = useState('')
  const [inventario, setInventario] = useState(0)
  const [tipo, setTipo] = useState('base')

  useEffect(() => {
    fetchIngredientes()
  }, [])

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from('ingredientes').select('*').order('id')
    if (error) return console.error(error)
    setIngredientes(data || [])
  }

  const crear = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('ingredientes').insert([{ nombre, inventario: Number(inventario), tipo }])
    if (error) return console.error(error)
    setNombre(''); setInventario(0); setTipo('base')
    fetchIngredientes()
  }

  const eliminar = async (id) => {
    const { error } = await supabase.from('ingredientes').delete().eq('id', id)
    if (error) return console.error(error)
    fetchIngredientes()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Gestión de ingredientes</h2>
      <form onSubmit={crear} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" className="border p-2 rounded" required />
          <input type="number" value={inventario} onChange={e=>setInventario(e.target.value)} placeholder="Inventario" className="border p-2 rounded" required />
          <select value={tipo} onChange={e=>setTipo(e.target.value)} className="border p-2 rounded">
            <option value="base">base</option>
            <option value="complemento">complemento</option>
          </select>
        </div>
        <button className="mt-3 bg-ice-500 text-white px-4 py-2 rounded">Crear ingrediente</button>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Inventario</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.id}</td>
                <td className="p-2">{i.nombre}</td>
                <td className="p-2">{i.inventario}</td>
                <td className="p-2">{i.tipo}</td>
                <td className="p-2">
                  <button onClick={()=>eliminar(i.id)} className="text-red-500">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
