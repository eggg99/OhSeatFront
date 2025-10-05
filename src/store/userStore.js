import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(persist(
    (set) => ({
        userId: '',
        userNick: '',
        userEmail: '',
        token : '',
        isLogin : false,
        setUser: (user) => set((state) => ({
            ...state,
            ...user,
        })),

        clearUser: () => set({ userId: '', userNick: '', userEmail: '',token:'',isLogin:false}),
    }),
    {
        name : 'user-store',
    }
));