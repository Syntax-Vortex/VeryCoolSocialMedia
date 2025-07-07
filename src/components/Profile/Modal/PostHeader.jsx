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
                <button className="text-[12px] md:text-[15px] text-white hover:text-red-800 duration-150 cursor-pointer ml-auto">
                    <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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