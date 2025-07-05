import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

function FeedPost(props){

    const { username, image, pfp} = props;

    return(
        <div className="flex flex-col justify-center items-start w-[90%] gap-3 mb-4 gradient-sage opacity-90 px-5 py-2 rounded-3xl
                        border border-white/5 hover:bg-[#343f66] hover:scale-[1.01] duration-500">
            <PostHeader username={username} pfp={pfp} />
            <div className="w-full my-1.5">
                <img className="w-1/3 h-auto rounded-[5px] shadow-2xl" src={image} />
            </div>
            <PostFooter />
        </div>
    )
}

export default FeedPost;