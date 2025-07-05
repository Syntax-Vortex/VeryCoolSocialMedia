import { useState } from "react";
import HeartButton from "../misc/HeartButton";

function PostFooter(){

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);
    const [comments, setComments] = useState(500);

    function handleLike() {
        if(liked){
            setLiked(false);
            setLikes(likes - 1);
        } else {
            setLiked(true);
            setLikes(likes + 1);
        }
    }

    return(
        <div className="flex flex-col items-start justify-center gap-4 pb-3 w-full">
            <div className="flex justify-center items-center gap-5 lg:gap-7">
                <div className="flex gap-2 justify-start items-center">
                    <button onClick={handleLike}>
                        <HeartButton />
                    </button>
                    <p className="text-[12px] lg:text[16px]">{likes} Likes</p>
                </div>
                <div className="flex gap-1 justify-start items-center">
                    <button>
                        <svg className="size-5 lg:size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    </button>
                    <p className="text-[12px] lg:text[16px]">{comments} Comments</p>
                </div>
            </div>

            <div className="w-full flex items-center border-0 border-b-1 border-gray-500">
                <input className="w-[90%]  outline-0" type="text" placeholder="Add a comment to this post"></input>
                <button className="text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto mr-auto">
                    Post
                </button>
            </div>
        </div>
    )
}

export default PostFooter;