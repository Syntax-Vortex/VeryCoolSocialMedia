import { useEffect, useState } from "react";
import getRelativeTime from "../../../../utils/getRelativeTime";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase";
import { Link } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import useDeleteComment from "../../../../Hooks/useDeleteComment";
import MinimalLoader from "../../../misc/MinimalLoader";

function PostComment(props) {
    const { comment } = props;
    const authUser = useAuthStore((state) => state.user);
    const [user, setUser] = useState(null);
    const {isDeleting, deleteComment, ErrorPopup} = useDeleteComment();

    const ownComment = authUser?.uid === comment.createdBy;

    function handleDeleteComment(){
        deleteComment(comment.postId,comment);
    }

    useEffect(() => {

        const getCommentOwner = async () => {
            const q = query(collection(firestore, 'users'), where('uid', '==', comment.createdBy));
            const querySnap = await getDocs(q);
            const userData = querySnap?.docs[0]?.data();
            setUser(userData);
        }

        if(comment) getCommentOwner();

    }, [comment])

    return (
        <div className="flex-1 flex gap-2 justify-start items-start w-full">
            <ErrorPopup />
            <Link to={`/${user?.username}`} className="hover:opacity-70 duration-150">
                <img className="size-10 rounded-full shadow-2xl" src={user?.pfp || '/defpfp.png'} />
            </Link>

            <Link to={`/${user?.username}`} className="flex flex-col hover:opacity-70 duration-150">
                <p className="font-semibold">{user?.username || 'Loading...'}</p>
                <p className="text-gray-400/70 text-[14px]">{getRelativeTime(comment.createdAt)}</p>
            </Link>

            <p className="flex-1 text-[15px]">{comment.comment}</p>
            <button className={`hover:text-red-700 duration-100 ${ownComment? 'block' : 'hidden'} mt-1`} onClick={handleDeleteComment} disabled={isDeleting}>
                {isDeleting? (<MinimalLoader />) : (<svg className="size-5" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>)}
            </button>
        </div>
    )
}

export default PostComment