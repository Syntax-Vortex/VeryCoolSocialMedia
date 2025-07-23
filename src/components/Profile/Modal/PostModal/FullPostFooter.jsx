import { useState } from "react";
import HeartButton from "../../../misc/HeartButton";
import PostComment from "./PostComment";
import usePostComment from "../../../../Hooks/usePostComment";
import MinimalLoader from "../../../misc/MinimalLoader";
import NoComments from "./NoComments";
import useLikePost from "../../../../Hooks/useLikePost";
import usePostStore from "../../../../store/postStore";

function PostFooter(props) {
    const { post } = props;
    const { posts } = usePostStore();
    
    const currentPost = posts.find(p => p.id === post.id) || post;
    const {isLiked, handleLike, isLoading, ErrorPopup: LikeError} = useLikePost(currentPost);
    const [newComment, setNewComment] = useState('')
    const { isCommenting, handleComment,showErrorPopup, ErrorPopup: CommentError } = usePostComment();

    async function handlePostComment() {
        if (newComment) {
            await handleComment(currentPost.id, newComment);
            setNewComment('');
        }else{
            showErrorPopup('Please enter a valid comment before posting')
        }
    }

    return (
        <div className="flex flex-col items-start justify-start gap-4 pb-3 flex-1 h-full">
            <CommentError />
            <LikeError />
            <div className="flex flex-col h-full gap-2  max-h-[85%] w-full">
                <p className="font-semibold text-xl">Comments</p>

                <div className="flex flex-col gap-6 overflow-x-hidden overflow-y-auto gradient-scrollbar w-full">
                    {currentPost?.comments?.length > 0 ? (
                        currentPost.comments.map((comment, index) => {
                            return <PostComment key={`${comment.createdBy}-${comment.createdAt}-${index}`} comment={comment} />
                        })
                    ) : (<NoComments />)}
                </div>
            </div>

            <div className="flex justify-center items-center gap-5 lg:gap-7">
                <div className="flex gap-2 justify-start items-center">
                    <button className="hover:opacity-70 duration-150" onClick={handleLike}>
                        <HeartButton isLiked={isLiked}/>
                    </button>
                    <p className="text-[12px] lg:text[16px]">{currentPost?.likes?.length || 0} Likes</p>
                </div>
                <div className="flex gap-1 justify-start items-center">
                    <svg className="size-5 lg:size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    <p className="text-[12px] lg:text[16px]">{currentPost?.comments?.length || 0} Comments</p>
                </div>
            </div>

            <div className="w-full flex items-center border-0 border-b-1 border-gray-500">
                <input className="w-[90%]  outline-0" type="text" placeholder="Add a comment to this post" value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                <button className="text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto mr-auto" onClick={handlePostComment}
                    disabled={isCommenting}>
                    {isCommenting ? (<MinimalLoader />) : 'Post'}
                </button>
            </div>
        </div>
    )
}

export default PostFooter;
