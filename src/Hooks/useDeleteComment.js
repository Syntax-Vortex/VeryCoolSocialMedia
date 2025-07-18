import { useState } from "react";
import useErrorPopup from "./useErrorPopup";
import usePostStore from "../store/postStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useDeleteComment() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const { deleteComment: removeComment } = usePostStore();

    const deleteComment = async (postId, commentToBeDeleted) => {
        setIsDeleting(true);
        try {
            const postRef = doc(firestore, 'posts', postId);
            const postSnap = await getDoc(postRef);
            const currentComments = postSnap.data().comments || [];
            await updateDoc(postRef, { comments: currentComments?.filter(comment => {
                return !(comment.comment === commentToBeDeleted.comment && comment.createdAt === commentToBeDeleted.createdAt && comment.createdBy === commentToBeDeleted.createdBy && comment.postId === commentToBeDeleted.postId)
            })})
            removeComment(commentToBeDeleted);

        } catch (error) {
            showErrorPopup(error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return {isDeleting, deleteComment, ErrorPopup}

}