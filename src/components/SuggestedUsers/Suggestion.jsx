import { useState } from "react"
import MinimalLoader from "../misc/MinimalLoader";
import useFollow from "../../Hooks/useFollow";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

function Suggestion(props) {
    const { user } = props
    const authUser = useAuthStore((state) => state.user);
    const { isUpdating, isFollowing, handleFollow, ErrorPopup } = useFollow(user.uid);

    return (
        <div className="flex justify-start items-center gap-2 w-full p-2 rounded-2xl duration-150 hover:scale-[1.01] cursor-pointer hover:bg-[#27272a] group">
            <ErrorPopup />
            <Link to={`/${user.username}`} className="flex items-center gap-2 flex-1">
                <img className="size-10 rounded-full shadow-2xl" src={user.pfp || '/defpfp.png'} />
                <div className="flex flex-col items-start justify-center">
                    <p className="font-semibold text-[10px] lg:text-[14px] text-white group-hover:underline">
                        {user.fullname}
                    </p>
                    <div className="text-gray-400 text-[10px] lg:text-[14px]">
                        {user.username}
                    </div>
                </div>
            </Link>

            {user.uid === authUser.uid ? (
                <div className="text-gray-500 text-[12px] md:text-[14px] ml-auto">That's you</div>
            ) : (
                <button
                    className="text-[10px] md:text-[14px] text-blue-500 hover:text-white duration-150 ml-auto hover:scale-[1.01]"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFollow();
                    }}
                >
                    {isUpdating ? <MinimalLoader /> : isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    )
}

export default Suggestion