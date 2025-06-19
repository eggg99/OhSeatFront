import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(persist(
    (set) => ({
        userId: '',
        userNick: '',
        userEmail: '',
        token : '',
        
        setUser: (user) => set({ userId: user.userId, userNick: user.userNick, userEmail: user.userEmail, token:user.token}),
        clearUser: () => set({ userId: '', userNick: '', userEmail: '',token:''}),
    }),
    {
        name : 'user-store',
    }
));