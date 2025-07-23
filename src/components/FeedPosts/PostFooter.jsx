import HeartButton from "../misc/HeartButton";
import useLikePost from "../../Hooks/useLikePost";
import { useState } from "react";
import PostModal from "../Profile/Modal/PostModal/PostModal";
import usePostStore from "../../store/postStore";
import usePostComment from "../../Hooks/usePostComment";
import MinimalLoader from "../misc/MinimalLoader";

function PostFooter(props) {
    const { post } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { posts } = usePostStore();
    
    const [newComment, setNewComment] = useState('');
    const currentPost = posts.find(p => p.id === post.id) || post;
    const { isLiked, handleLike, isLoading, ErrorPopup: LikeError } = useLikePost(currentPost);
    const { isCommenting, handleComment,showErrorPopup, ErrorPopup: CommentError } = usePostComment();

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    async function handlePostComment() {
        if (newComment) {
            await handleComment(currentPost.id, newComment);
            setNewComment('');
        }else{
            showErrorPopup('Please enter a valid comment before posting')
        }
    }

    return (
        <div className="flex flex-col items-start justify-center gap-4 pb-3 w-full">
            <LikeError />
            <CommentError />
            <PostModal post={currentPost} handleCloseModal={handleCloseModal} isOpen={isOpen}/>
            <div className="flex justify-center items-center gap-5 lg:gap-7">
                <div className="flex gap-2 justify-start items-center">
                    <button className="hover:opacity-70 duration-150" onClick={handleLike}>
                        <HeartButton isLiked={isLiked} />
                    </button>
                    <p className="text-[12px] lg:text[16px]">{currentPost.likes.length} Likes</p>
                </div>
                <button className="flex gap-1 justify-start items-center hover:text-gray-400 duration-150" onClick={handleOpenModal}>
                    <svg className="size-5 lg:size-7" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    <p className="text-[12px] lg:text[16px]">{currentPost.comments.length} Comments</p>
                </button>
            </div>

            <div className="w-full flex items-center border-0 border-b-1 border-gray-500">
                <input className="w-[90%]  outline-0" value={newComment} onChange={(e) => {setNewComment(e.target.value)}} type="text" placeholder="Add a comment to this post"></input>
                <button className="text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto mr-auto" onClick={handlePostComment}
                        disabled={isCommenting}>
                    {isCommenting ? (<MinimalLoader />) : 'Post'}
                </button>
            </div>
        </div>
    )
}

export default PostFooter;