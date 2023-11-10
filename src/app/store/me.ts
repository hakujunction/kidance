import { create } from 'zustand'

type State = {
    email?: string,
    status: 'resolved' | 'pending' | 'initial',
}
  
type Action = {
    setEmail: (email: State['email']) => void,
    setStatus: (status: State['status']) => void
}

export const useMeStore = create<State & Action>((set) => ({
  email: undefined,
  status: 'initial',
  setEmail: (email) => set(() => ({email})),
  setStatus: (status) => set(() => ({status})),
}))