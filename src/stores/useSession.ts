import { create } from "zustand";

interface SessionState {
    currentSession: any;
    setSession: (data: any) => void;
}

const useSession = create<SessionState>((set) => ({
    currentSession: null,
    setSession: (data) => set({ currentSession: data }),
}));

export default useSession;
