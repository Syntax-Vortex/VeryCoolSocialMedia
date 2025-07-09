function PostComment(props){
    const { pfp, username, text, createdAt } = props;
    return(
        <div className="flex-1 flex gap-2 justify-start items-start">
            <div>
                <img className="size-10 rounded-full shadow-2xl" src={pfp} />
            </div>

            <div className="flex flex-col">
                <p className="font-semibold">{username}</p>
                <p className="text-gray-400/70 text-[14px]">{createdAt}</p>
            </div>

            <p className="flex-1 text-[15px]">{text}</p>
        </div>
    )
}

export default PostComment