import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(persist(
    (set) => ({
        userId: '',
        userNick: '',
        userEmail: '',
        token : '',
        isAdmin : false,
        isLogin : false,
        setUser: (user) => set((state) => ({
            ...state,
            ...user,
        })),

        clearUser: () => set({ userId: '', userNick: '', userEmail: '',token:'',role:'', isAdmin : false, isLogin:false}),
    }),
    {
        name : 'user-store',
    }
));