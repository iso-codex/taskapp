import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useChatStore = create((set, get) => ({
    conversations: [], // List of users (contacts)
    messages: [], // Current conversation messages
    selectedUser: null,
    loading: false,
    subscription: null,

    // Fetch list of available contacts based on role
    fetchContacts: async (currentUserId) => {
        set({ loading: true });
        try {
            // Get current user's profile to know role
            const { data: currentUser } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentUserId)
                .single();

            let query = supabase.from('profiles').select('id, full_name, role, avatar_url');

            if (currentUser?.role === 'client') {
                // Client sees their assigned programmers
                // Find projects where I am the client
                const { data: projects } = await supabase
                    .from('projects')
                    .select('programmer_id')
                    .eq('client_id', currentUserId);

                const programmerIds = projects?.map(p => p.programmer_id) || [];
                query = query.in('id', programmerIds);
            } else {
                // Programmer sees other programmers AND their clients
                // For simplicity MVP: fetch all for now, or filter
                // Ideally: All Programmers + Clients assigned to me
                // Let's just fetch everyone for now to make it easy to verify connectivity
                // Or slightly better: fetch all profiles except self
                query = query.neq('id', currentUserId);
            }

            const { data, error } = await query;

            if (error) throw error;
            set({ conversations: data || [] });
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            set({ loading: false });
        }
    },

    selectUser: async (user) => {
        set({ selectedUser: user, messages: [] });
        get().fetchMessages(user.id);
        get().subscribeToMessages();
    },

    fetchMessages: async (otherUserId) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            set({ messages: data || [] });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    },

    sendMessage: async (content) => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase.from('messages').insert({
                sender_id: user.id,
                receiver_id: selectedUser.id,
                content
            });

            if (error) {
                console.error('Supabase message send error:', error);
                throw error;
            }
            // Optimistic update or wait for subscription
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message: ' + (error.message || error.details || error));
        }
    },

    subscribeToMessages: async () => {
        const { subscription } = get();
        if (subscription) supabase.removeChannel(subscription);

        const sub = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const { selectedUser } = get();
                    const newMessage = payload.new;
                    // If the new message is part of current conversation
                    // Need current user ID to check if it matches
                    supabase.auth.getUser().then(({ data: { user } }) => {
                        if (
                            (newMessage.sender_id === user?.id && newMessage.receiver_id === selectedUser?.id) ||
                            (newMessage.sender_id === selectedUser?.id && newMessage.receiver_id === user?.id)
                        ) {
                            set((state) => ({
                                messages: [...state.messages, newMessage]
                            }));
                        }
                    });
                }
            )
            .subscribe();

        set({ subscription: sub });
    }
}));
