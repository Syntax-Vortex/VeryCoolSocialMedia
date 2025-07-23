import { useState } from "react";
import useAuthStore from "../store/authStore";
import useErrorPopup from "./useErrorPopup";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/postStore";

export default function useLikePost(post){
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
    const {showErrorPopup, hideErrorPopup, ErrorPopup} = useErrorPopup();
    const {toggleLike} = usePostStore();

    const handleLike = async() => {
        if(isLoading) return;
        if(!authUser){
            showErrorPopup('You must be logged in to like a post');
            return;
        }
        setIsLoading(true);

        try {
            const postRef = doc(firestore, 'posts', post.id);
            toggleLike(post.id, authUser);
            await updateDoc(postRef, {
                likes: isLiked? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });
            setIsLiked(!isLiked);
            isLiked? setLikes(likes - 1) : setLikes(likes + 1);

        } catch (error) {
            showErrorPopup(error.message)
        }finally{
            setIsLoading(false);
        }
    }

    return {isLiked, handleLike, isLoading, ErrorPopup}
}