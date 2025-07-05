function PostHeader(props){

    const { username, pfp } = props;

    return(
        <div className="w-full flex flex-col gap-2 lg:gap-4">
            <div className="flex justify-start items-center w-full gap-2 lg:gap-4 psd-2">
                <img className="size-10 rounded-full shadow-2xl" src={pfp} />
                <div className="flex flex-col justify-center">
                    <div className="flex text-[12px] lg:text-[16px] font-medium gap-2">
                        {username}
                    </div>
                    <div  className="text-gray-400 text-[10px] lg:text-[16px]">
                        1 week ago
                    </div>
                </div>
                <button className="text-[12px] md:text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer ml-auto">
                    Unfollow
                </button>
            </div>

            <div>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    This is just an example caption 
                </p>
            </div>
        </div>   
    )
}

export default PostHeader;