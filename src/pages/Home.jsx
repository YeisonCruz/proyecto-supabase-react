import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    const { data, error } = await supabase.from('productos').select('*')
    if (error) {
      console.error(error)
      return
    }
    setProductos(data || [])
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Nuestros productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.length === 0 && <div className="p-6 bg-ice-50 rounded">No hay productos aún.</div>}
        {productos.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
