import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from '../../store/authStore.js'
import usePfpUpdatedAt from "../../store/usePfpUpdatedAt.js";
import useFollow from "../../Hooks/useFollow.js";
import MinimalLoader from '../misc/MinimalLoader.jsx'

function ProfileHeader( props ){
    const { isOpen, handleCloseModal, handleOpenModal } = props;
    const { pfpUpdatedAt } = usePfpUpdatedAt();
    const { userProfile } = useUserProfileStore();
    const {isUpdating, isFollowing, handleFollow, ErrorPopup} = useFollow(userProfile.uid);
    const authUser = useAuthStore((state) => state.user);
    const visitingOwnProfile = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfile = authUser && authUser.username != userProfile.username;

    return(
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center gap-4 sm:gap-10">
            <ErrorPopup />
            <img className="size-12 sm:size-20 md:size-30 aspect-square rounded-full" src={userProfile.pfp? `${userProfile.pfp}?t=${pfpUpdatedAt}` : '/defpfp.png'} />

            <div className="flex flex-col justify-center items-start">
                
                <p className="font-semibold text-[18px] lg:text-[28px] flex items-center justify-start gap-5 w-full">
                    {userProfile.fullname}
                    {visitingOwnProfile && 
                        <button className="text-[14px] text-black bg-gray-300 p-2 sm:p-2 sm:px-3 rounded-full ml-auto mr-4 sm:mx-0 hover:bg-gray-500 
                                duration-150" onClick={handleOpenModal} disabled={isUpdating}>
                            Edit Profile
                        </button>
                    }
                    {visitingAnotherProfile && 
                        <button className="text-[16px] bg-blue-500 p-2 sm:p-2 sm:px-4 rounded-full ml-auto mr-4 sm:mx-0 hover:bg-blue-700 
                                duration-150" onClick={handleFollow}>
                            {isUpdating? (<MinimalLoader />) : isFollowing? 'Unfollow' : 'Follow'}
                        </button>
                    }
                    
                </p>

                <p className="font-medium text-gray-300 text-[16px] sm:text-[20px] mb-2">{userProfile.username}</p>

                <div className="flex justify-start items-center gap-4">

                    <p className="font-thin"><span className="font-bold">{userProfile?.posts?.length || 0}</span> Posts</p>
                    <p className="font-thin"><span className="font-bold">{userProfile?.following?.length || 0}</span> Following</p>
                    <p className="font-thin"><span className="font-bold">{userProfile?.followers?.length || 0}</span> Followers</p>
                    
                </div>

                <p className="font-light pt-2">
                    {userProfile.bio}
                </p>
            </div>
        </div>
    )
}

export default ProfileHeader