import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(persist(
    (set) => ({
        userId: '',
        userNick: '',
        userEmail: '',
        
        setUser: (user) => set({ userId: user.userId, userNick: user.userNick, userEmail: user.userEmail}),
        clearUser: () => set({ userId: '', userNick: '', userEmail: '',}),
    }),
    {
        name : 'user-store',
    }
));