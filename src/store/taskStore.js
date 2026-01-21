import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useTaskStore = create((set, get) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            set({ tasks: data })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    addTask: async (task) => {
        set({ loading: true, error: null })
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { data, error } = await supabase
                .from('tasks')
                .insert([{ ...task, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            set((state) => ({ tasks: [data, ...state.tasks] }))
            return data
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    updateTask: async (id, updates) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? data : t))
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    deleteTask: async (id) => {
        set({ loading: true, error: null })
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)

            if (error) throw error
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },
}))
