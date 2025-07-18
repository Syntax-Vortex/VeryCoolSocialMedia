import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    createPost:(post) => set(state => ({posts: [post, ...state.posts]})),
    setPosts:(posts) => set({posts}),
    deletePost:(id) => set(state => ({posts: state.posts.filter(post => post.id !== id)})),
    addComment:(postId, newComment) => set(state => ({
        posts: state.posts.map(post => {
            if(post.id === postId){
                return {...post, comments: [newComment, ...(post.comments || [])]}
            }
            return post
        })
    })),
    deleteComment:(commentToBeDeleted) => set(state => ({
        posts: state.posts.map(post => {
            if(post.id === commentToBeDeleted.postId){
                return {...post, comments: post.comments.filter(comment => {
                    return !(comment.comment === commentToBeDeleted.comment && comment.createdAt === commentToBeDeleted.createdAt && comment.createdBy === commentToBeDeleted.createdBy && comment.postId === commentToBeDeleted.postId)
                })}
            }
            return post
        })
    }))
}))

export default usePostStore