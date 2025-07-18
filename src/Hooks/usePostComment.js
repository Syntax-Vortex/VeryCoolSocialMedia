import { useState } from "react";
import useErrorPopup from './useErrorPopup';
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

export default function usePostComment() {
    const [isCommenting, setIsCommenting] = useState(false);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment)

    const handleComment = async (postId, comment) => {
        if (!authUser) {
            showErrorPopup("You must be logged in to comment");
            return;
        }

        setIsCommenting(true);
        try {
            const newComment = {
                comment: comment,
                createdBy: authUser.uid,
                createdAt: Date.now(),
                postId: postId
            }

            const postRef = doc(firestore, 'posts', postId);
            const postSnap = await getDoc(postRef);
            const currentComments = postSnap.data().comments || [];
            await updateDoc(postRef, { comments: [newComment, ...(currentComments || [])]})
            addComment(postId, newComment);

        } catch (error) {
            showErrorPopup(error.message)
        } finally {
            setIsCommenting(false);
        }
    }

    return { isCommenting, handleComment, showErrorPopup, ErrorPopup }

}