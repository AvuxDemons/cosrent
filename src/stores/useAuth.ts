import { create } from "zustand";
import { signIn, signOut } from "next-auth/react"

interface SessionState {
    loading: boolean;
    signIn: () => void;
    signOut: () => void;
}

const useAuth = create<SessionState>((set) => ({
    loading: false,
    signIn: () => {
        set({ loading: true });
        signIn("instagram");
        set({ loading: false });
    },
    signOut: () => {
        set({ loading: true });
        signOut();
        set({ loading: false });
    }
}));

export default useAuth;
