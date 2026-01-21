import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useProjectStore = create((set, get) => ({
    projects: [],
    currentProject: null,
    projectNotes: [],
    projectTasks: [],
    loading: false,
    error: null,

    // Projects CRUD
    fetchProjects: async () => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('updated_at', { ascending: false })

            if (error) throw error
            set({ projects: data })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    addProject: async (project) => {
        set({ loading: true, error: null })
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { data, error } = await supabase
                .from('projects')
                .insert([{ ...project, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            set((state) => ({ projects: [data, ...state.projects] }))
            return data
        } catch (error) {
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    updateProject: async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            set((state) => ({
                projects: state.projects.map((p) => (p.id === id ? data : p)),
                currentProject: state.currentProject?.id === id ? data : state.currentProject
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    deleteProject: async (id) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id)

            if (error) throw error
            set((state) => ({
                projects: state.projects.filter((p) => p.id !== id),
                currentProject: state.currentProject?.id === id ? null : state.currentProject
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    setCurrentProject: (project) => {
        set({ currentProject: project })
    },

    // Project Notes CRUD
    fetchProjectNotes: async (projectId) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('project_notes')
                .select('*')
                .eq('project_id', projectId)
                .order('updated_at', { ascending: false })

            if (error) throw error
            set({ projectNotes: data })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    addProjectNote: async (projectId, note) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { data, error } = await supabase
                .from('project_notes')
                .insert([{ ...note, project_id: projectId, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            set((state) => ({ projectNotes: [data, ...state.projectNotes] }))
            return data
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    updateProjectNote: async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('project_notes')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            set((state) => ({
                projectNotes: state.projectNotes.map((n) => (n.id === id ? data : n))
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    deleteProjectNote: async (id) => {
        try {
            const { error } = await supabase
                .from('project_notes')
                .delete()
                .eq('id', id)

            if (error) throw error
            set((state) => ({
                projectNotes: state.projectNotes.filter((n) => n.id !== id)
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    // Project Tasks CRUD
    fetchProjectTasks: async (projectId) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('project_tasks')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false })

            if (error) throw error
            set({ projectTasks: data })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    addProjectTask: async (projectId, task) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { data, error } = await supabase
                .from('project_tasks')
                .insert([{ ...task, project_id: projectId, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            set((state) => ({ projectTasks: [data, ...state.projectTasks] }))
            return data
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    updateProjectTask: async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('project_tasks')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            set((state) => ({
                projectTasks: state.projectTasks.map((t) => (t.id === id ? data : t))
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },

    deleteProjectTask: async (id) => {
        try {
            const { error } = await supabase
                .from('project_tasks')
                .delete()
                .eq('id', id)

            if (error) throw error
            set((state) => ({
                projectTasks: state.projectTasks.filter((t) => t.id !== id)
            }))
        } catch (error) {
            set({ error: error.message })
            throw error
        }
    },
}))
