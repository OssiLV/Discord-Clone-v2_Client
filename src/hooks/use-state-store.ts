import { create } from "zustand";

export type StateType = "newServer" | "newChannel";

// interface StateData {
//     server?: Server;
//     // channel?: Channel;
//     // channelType?: ChannelType;
//     // apiUrl?: string;
//     // query?: Record<string, any>;
// }

interface StateStore {
    type: StateType | null;
    data: any | null;
    setData: (type: StateType, data?: any) => void;
    flush: () => void;
}

export const useDataState = create<StateStore>((set) => ({
    type: null,
    data: null,
    setData: (type, data) => set({ type, data }),
    flush: () => set({ type: null, data: {} }),
}));
