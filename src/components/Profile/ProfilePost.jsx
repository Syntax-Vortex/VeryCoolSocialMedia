import { useState } from "react";
import PostModal from "./Modal/PostModal/PostModal";

function ProfilePost(props) {
    const [postOpen, setPostOpen] = useState(false);
    const { post } = props;

    function handleClosePost() {
        setPostOpen(false);
    }

    function handleOpenPost() {
        setPostOpen(true);
    }

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 h-40 px-2">
            <div className={`h-full w-full rounded-3xl ${post.theme} flex flex-col p-2 gap-2 hover:scale-[1.01] duration-150 relative group`} onClick={handleOpenPost}>
                <p className="text-gray-300 line-clamp-2">
                    {post.caption}
                </p>

                <hr className="text-gray-300 opacity-40" />

                <div className="flex-1 flex gap-2 items-center justify-center overflow-hidden">
                    {post.images.length > 0? (
                        <>
                            {post.images[0] && (
                                <img src={post.images[0]} className="h-full w-auto object-contain rounded-lg" />
                            )}
                            {post.images[1] && (
                                <img src={post.images[1]} className="h-full w-auto object-contain rounded-lg" />
                            )}
                            {post.images[2] && (
                                <div className="relative rounded-xl h-full w-auto">
                                    <img src={post.images[2]} className="h-full w-full object-contain rounded-xl" />
                                    <div className='absolute inset-0 flex justify-center items-center bg-black/80 opacity-100 rounded-xl'>
                                        <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center text-gray-300/50">
                            <svg className="size-7 lucide lucide-image-off-icon lucide-image-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>
                            <p className="">This post has no images!</p>
                        </div>
                    )}

                </div>

                <div className="inset-0 absolute justify-center items-center bg-black/40 opacity-100 hidden group-hover:flex w-full h-full backdrop-blur-[1px] gap-5 duration-150">
                    <div className="font-semibold flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        <p>{post.likes.length}</p>
                    </div>

                    <div className="font-semibold flex items-center justify-center gap-1">
                        <svg className="size-5 lg:size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                        <p>{post.comments.length}</p>
                    </div>
                </div>
            </div>
            <PostModal isOpen={postOpen} handleCloseModal={handleClosePost} post={post} />
        </div>
    );
}

export default ProfilePost;
