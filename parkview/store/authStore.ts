import {supabase} from "@/lib/supabase";
import { create } from "zustand";

export interface  User{
    id: string;
    email: string;
}

interface AuthState{
    user: User | null;
    isLoading: boolean;
    error: string | null;


    //Auth actions
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    //login with email and passowrd
    login: async (email: string, password: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }
            if(data && data.user) {
                set({ 
                    user: {
                        id: data.user.id,
                        email: data.user.email || "",
                    },
                    isLoading: false,
                    error: null,
                 });
            }

        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    //signup with email and password
    signup: async (email: string, password: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                throw error;
            }
            if(data && data.user) {
                set({ 
                    user: {
                        id: data.user.id,
                        email: data.user.email || "",
                    },
                    isLoading: false,
                    error: null,
                 });
            }

            // set({ user: data.user, isLoading: false, error: null });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    logout: async () => {
        try {
            set({ isLoading: true, error: null });
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            set({ user: null, isLoading: false, error: null });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    checkSession: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                throw error;
            }

            if (data.session && data.session.user) {
                set({
                    user: {
                        id: data.session.user.id,
                        email: data.session.user.email || "",
                    },
                    isLoading: false,
                    error: null,
                });
            } else {
                set({ user: null, isLoading: false, error: null });
            }
        } catch (error: any) {
            set({ user: null, error: error.message, isLoading: false });
        }

    },
}))