import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import Loader from "../misc/LoaderSkeleton";

function Feed(){

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    return(
        <div className="flex flex-col items-center h-full overflow-y-scroll scrollbar-hide pt-10">
            {isLoading? (
                <>
                    <Loader />
                    <Loader />
                </>
            ) : (
                <>
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                    <FeedPost username='beastgamergs' image='/img1.png' pfp='/img1.png' />
                </>
            )}
        </div>
    )
}

export default Feed;