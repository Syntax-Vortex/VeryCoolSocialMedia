import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    addPost: (post) => set(state => ({
        userProfile: state.userProfile ? {
            ...state.userProfile,
            posts: [post.id, ...(state.userProfile.posts || [])]
        } : state.userProfile
    })),
    removePost: (id) => set(state => ({
        userProfile: state.userProfile ? {
            ...state.userProfile,
            posts: state.userProfile.posts ? state.userProfile.posts.filter(post => post !== id) : []
        } : state.userProfile
    }))
}))

export default useUserProfileStore