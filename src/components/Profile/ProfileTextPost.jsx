import { useState } from "react";
import PostModal from "./Modal/PostModal/PostModal";

function ProfileTextPost(props) {
    const [postOpen, setPostOpen] = useState(false);
    const { post } = props;

    function handleClosePost() {
        setPostOpen(false);
    }

    function handleOpenPost() {
        setPostOpen(true);
    }

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
            <div
                className={`max-h-40 overflow-hidden rounded-3xl ${post.theme} flex flex-col p-2 gap-2 hover:scale-[1.01] duration-150 relative group`}
                onClick={handleOpenPost}
            >
                <p className="text-gray-300 line-clamp-4 sm:line-clamp-5 lg:line-clamp-6">
                    {post.caption}
                </p>

                <div className="inset-0 absolute justify-center items-center bg-black/40 opacity-100 hidden group-hover:flex w-full h-full backdrop-blur-[1px] gap-5 duration-150">
                    <div className="font-semibold flex items-center justify-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-heart"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <p>{post.likes.length}</p>
                    </div>

                    <div className="font-semibold flex items-center justify-center gap-1">
                        <svg
                            className="size-5 lg:size-7 lucide lucide-message-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                        <p>{post.comments.length}</p>
                    </div>
                </div>
            </div>

            <PostModal isOpen={postOpen} handleCloseModal={handleClosePost} post={post} />
        </div>


    );
}

export default ProfileTextPost;
