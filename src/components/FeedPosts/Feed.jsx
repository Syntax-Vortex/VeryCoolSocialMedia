import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import Loader from "../misc/LoaderSkeleton";
import useGetFeedPosts from '../../Hooks/useGetFeedPosts'
import NoPosts from "./NoPosts";

function Feed(){

    const {isLoading, posts} = useGetFeedPosts();
    
    // Debug logging
    console.log('Feed - isLoading:', isLoading);
    console.log('Feed - posts:', posts);
    console.log('Feed - posts length:', posts?.length);

    return(
        <div className="flex flex-col items-center h-full w-full overflow-y-scroll scrollbar-hide pt-10">
            {isLoading? (
                <>
                    <Loader />
                    <Loader />
                </>
            ) : ( posts && posts.length > 0 ? (
                posts.map(post => {
                    return(
                        <FeedPost post={post} key={post.id}/>
                    )
                })
            ) : (<NoPosts />))}
        </div>
    )
}

export default Feed;