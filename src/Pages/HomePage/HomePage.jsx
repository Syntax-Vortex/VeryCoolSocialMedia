import Feed from "../../components/FeedPosts/Feed";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

function HomePage(){
    return(
        <div className="flex h-[100vh]">
            <div className="flex-1 flex justify-center">
                <Feed />
            </div>
            <div className="w-[300px] hidden lg:block">
                <SuggestedUsers />
            </div>
        </div>
    )
}

export default HomePage;