import {EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY,} from "@/config";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";


//implememnt a custom storage for supabase to use secure store


const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        if(Platform.OS === 'web') {
            return localStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        if(Platform.OS === 'web') {
            localStorage.setItem(key, value);
            return 
        }
        return SecureStore.setItemAsync(key, value);
    
    },
    removeItem: (key: string) => {
        if(Platform.OS === 'web') {
            localStorage.removeItem(key);
            return;
        }
        return SecureStore.deleteItemAsync(key);
    },
    
};


//Initialize the supabase client
const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false, // Disable session detection in URL for mobile apps
    },
    global: {
        headers: {
            "x-client-info": `supabase-js/${process.env.SUPABASE_JS_VERSION || "1.0.0"}`,
        },
    },
});