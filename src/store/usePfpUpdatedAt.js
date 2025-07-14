import { create } from "zustand"

const usePfpUpdatedAt = create((set) => ({
    pfpUpdatedAt: Date.now(),
    setPfpUpdatedAt: () => set(() => ({ pfpUpdatedAt: Date.now() }))
}))

export default usePfpUpdatedAt