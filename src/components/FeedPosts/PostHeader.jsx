import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import getRelativeTime from "../../utils/getRelativeTime";
import { Link } from "react-router-dom";
import useFollow from "../../Hooks/useFollow";
import MinimalLoader from "../misc/MinimalLoader";

function PostHeader(props) {

    const { post } = props;
    const [postOwner, setPostOwner] = useState(null);
    const {isUpdating, isFollowing, handleFollow, ErrorPopup} = useFollow(post.createdBy);

    useEffect(() => {

        const getPostOwner = async () => {
            const q = query(collection(firestore, 'users'), where('uid', '==', post.createdBy));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
                setPostOwner(querySnap.docs[0].data());
            }
        }

        if (post) getPostOwner();

    }, [post])

    return (
        <div className="w-full flex flex-col gap-2 lg:gap-4">
            <div className="flex justify-start items-center w-full gap-2 lg:gap-4 psd-2">
                <Link className="flex justify-start items-center gap-2 lg:gap-4 psd-2 rounded-xl hover:opacity-70 duration-150" to={`/${postOwner?.username}`}>
                    <img className="size-10 rounded-full shadow-2xl" src={postOwner?.pfp || '/defpfp.png'} />
                    <div className="flex flex-col justify-center">
                        <div className="flex text-[12px] lg:text-[16px] font-medium gap-2">
                            {postOwner?.username}
                        </div>
                        <div className="text-gray-400 text-[10px] lg:text-[16px]">
                            {getRelativeTime(post.createdAt)}
                        </div>
                    </div>
                </Link>

                <button className="text-[12px] md:text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto" onClick={handleFollow}>
                    {isUpdating? (<MinimalLoader />) : (isFollowing? 'Unfollow' : 'Follow')}
                </button>
            </div>

            <div>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    {post.caption}
                </p>
            </div>
        </div>
    )
}

export default PostHeader;