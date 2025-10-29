import React from 'react'

export default function ProductCard({ product }) {
  return (
    <article className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="h-40 bg-ice-50 rounded mb-3 flex items-center justify-center text-ice-300">Imagen</div>
      <h3 className="text-lg font-semibold">{product.nombre}</h3>
      <p className="text-sm text-gray-600">Calorías: {product.calorias ?? '—'}</p>
      <p className="text-sm text-gray-600">Precio: ${product.precio_publico ?? product.precio ?? '—'}</p>
    </article>
  )
}
