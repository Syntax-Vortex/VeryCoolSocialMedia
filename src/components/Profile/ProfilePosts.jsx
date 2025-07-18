import ProfilePost from "./ProfilePost"
import '../../SleekScrollbar.css'
import useGetUserPosts from "../../Hooks/useGetUserPosts";
import PostLoader from "../misc/PostLoader";
import NoPosts from "./NoPosts";

function ProfilePosts(props) {
    const { handleOpenModal } = props;
    const { isLoading, posts, ErrorPopup } = useGetUserPosts();

    if (isLoading) return null;


    if (!isLoading) return (
        <div className="w-full flex-1 flex flex-wrap mt-3 gap-y-3 overflow-y-auto mb-5 sleek-scrollbar">
            <ErrorPopup />
            {isLoading && (
                <>
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                </>  
            )}
            {!isLoading && (posts.length > 0? posts.map((post) => {
                return <ProfilePost key={post.id} post={post} handleOpenModal={handleOpenModal} />
            }) : <NoPosts />)}
        </div>
    )
}

export default ProfilePosts