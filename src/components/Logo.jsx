import React from 'react'
import { Snowflake } from 'lucide-react'

export default function Logo({ className = 'text-2xl' }) {
  return (
    <div className={'flex items-center gap-3 ' + className}>
      <Snowflake className="text-ice-500 w-8 h-8" />
      <div>
        <div className="text-2xl font-pacifico text-ice-500">Código Congelado</div>
        <div className="text-sm text-gray-600">¡Disfruta el código más frío y delicioso!</div>
      </div>
    </div>
  )
}
