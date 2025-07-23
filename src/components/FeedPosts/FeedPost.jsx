import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

function FeedPost(props){

    const { post } = props;

    return(
        <div className={`flex flex-col justify-center items-start w-[90%] gap-3 mb-4 ${post.theme} opacity-90 px-7 py-4 rounded-3xl
                        border border-white/5 hover:scale-[1.01] duration-500`}>
            <PostHeader post={post}/>
            <div className="flex gap-2 flex-wrap items-center justify-start w-full my-1.5">
                {post.images.length > 0? (
                    post.images.map((image, index) => {
                        return(
                            <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-2xl" src={image} key={index}/>
                        )
                    })): (null)}
                
            </div>
            <PostFooter post={post}/>
        </div>
    )
}

export default FeedPost;