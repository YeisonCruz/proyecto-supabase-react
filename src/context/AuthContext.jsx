import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('public')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        setSession(data.session)
        setUser(data.session.user)
        await fetchRole(data.session.user.id)
      }
      setLoading(false)
    }
    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session)
        setUser(session.user)
        fetchRole(session.user.id)
      } else {
        setSession(null)
        setUser(null)
        setRole('public')
      }
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const fetchRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('id', userId)
        .single()
      if (data?.rol) setRole(data.rol)
    } catch (err) {
      console.error('fetchRole', err)
    }
  }

  const signup = async (email, password, nombre) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    // create entry in usuarios table with rol 'cliente'
    const userId = data.user?.id
    if (userId) {
      await supabase.from('usuarios').insert([{ id: userId, nombre, correo: email, rol: 'cliente' }])
      await fetchRole(userId)
    }
    return data
  }

  const signin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRole('public')
  }

  return (
    <AuthContext.Provider value={{ session, user, role, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
