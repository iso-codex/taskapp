import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
    user: null,
    profile: null,
    session: null,
    loading: true,

    initialize: async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            let profile = null
            if (session?.user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                profile = data
            }

            set({ session, user: session?.user ?? null, profile, loading: false })

            supabase.auth.onAuthStateChange(async (_event, session) => {
                let profile = null
                if (session?.user) {
                    const { data } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single()
                    profile = data
                }
                set({ session, user: session?.user ?? null, profile, loading: false })
            })
        } catch (error) {
            console.error('Auth initialization error:', error)
            set({ loading: false })
        }
    },

    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    },

    signUp: async (email, password, additionalData = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: additionalData // Pass full_name, role etc here
            }
        })
        if (error) throw error
        return data
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        set({ session: null, user: null, profile: null })
    },
}))
