import { useState } from "react"

function Suggestion(){
    const [isFollowed, setIsFollowed] = useState();

    return(
        <div className="flex justify-start items-center gap-2 w-full hover:bg-[#27272a] p-2 rounded-2xl duration-150 hover:scale-[1.01] cursor-pointer">
            <img className="size-10 rounded-full shadow-2xl" src='/img1.png' />
            <div className="flex flex-col items-start justify-center">
                <p className="font-semibold text-[10px] lg:text-[14px]">David Beckham</p>
                <div  className="text-gray-400 text-[10px] lg:text-[14px]">
                        1 week ago
                </div>
            </div>
            <button className="text-[10px] md:text-[14px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto hover:scale-[1.01]"
                    onClick={() => setIsFollowed(!isFollowed)}>
                    {isFollowed? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}

export default Suggestion