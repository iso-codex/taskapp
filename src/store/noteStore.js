import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useNoteStore = create((set, get) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async () => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .order('pinned', { ascending: false })
                .order('updated_at', { ascending: false })

            if (error) throw error
            set({ notes: data })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    addNote: async (note) => {
        set({ loading: true, error: null })
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { data, error } = await supabase
                .from('notes')
                .insert([{ ...note, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            set((state) => ({ notes: [data, ...state.notes] }))
            return data
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    updateNote: async (id, updates) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('notes')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            set((state) => ({
                notes: state.notes.map((n) => (n.id === id ? data : n))
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    deleteNote: async (id) => {
        set({ loading: true, error: null })
        try {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id)

            if (error) throw error
            set((state) => ({
                notes: state.notes.filter((n) => n.id !== id)
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    togglePin: async (id, currentPinned) => {
        const { updateNote } = get()
        await updateNote(id, { pinned: !currentPinned })
    },
}))
