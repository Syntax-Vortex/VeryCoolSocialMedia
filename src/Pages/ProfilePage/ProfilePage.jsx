import { Link, useParams } from "react-router-dom"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import { useState } from "react"
import PostModal from "../../components/Profile/Modal/PostModal/PostModal"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebase"
import useGetUserProfileByUsername from "../../Hooks/useGetUserProfileByUsername"
import UserNotFound from "../../components/Profile/UserNotFound"
import ProfileHeaderLoadingSkeleton from '../../components/misc/ProfileHeaderLoadingSkeleton'
import EditProfileModal from "../../components/Profile/Modal/EditProfileModal/EditProfileModal"

function ProfilePage(){

    const [postOpen, setPostOpen ] = useState(false);
    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [user,loading,error] = useAuthState(auth);
    const { username } = useParams();
    const {isLoading, hasFetched, userProfile, ErrorPopup } = useGetUserProfileByUsername(username);

    function handleClosePost() {
        setPostOpen(false);
    }

    function handleOpenPost() {
        setPostOpen(true);
    }

    function handleCloseEditProfile(){
        setEditProfileModalOpen(false);
    }

    function handleOpenEditProfile(){
        setEditProfileModalOpen(true);
    }

    if(hasFetched && !userProfile) return <UserNotFound />;
    if(!hasFetched) return <ProfileHeaderLoadingSkeleton />;

    return(
        <div className={"flex flex-col w-full h-[100vh]  lg:pr-30 " + (user? 'sm:pb-4 pt-10 pl-4 sm:pl-10' : 'sm:pb-10 pt-12 sm:pt-20 lg:pl-30')}>
            <ErrorPopup />
            <ProfileHeader handleOpenModal={handleOpenEditProfile}/>
            <ProfileTabs />
            <ProfilePosts handleOpenModal={handleOpenPost}/>
            <PostModal isOpen={postOpen} handleCloseModal={handleClosePost} image='/img1.png' username='beastgamergs' pfp='/img1.png' />
            <EditProfileModal isOpen={editProfileModalOpen} handleCloseModal={handleCloseEditProfile} handleOpenModal={handleOpenEditProfile}/>
        </div> 
    )
}

export default ProfilePage