import { Link } from "react-router-dom"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import { useState } from "react"
import PostModal from "../../components/Profile/Modal/PostModal"

function ProfilePage(){

    const [isOpen, setIsOpen ] = useState(false);

    function handleCloseModal() {
        setIsOpen(false);
    }

    function handleOpenModal() {
        setIsOpen(true);
    }

    return(
        <div className="flex flex-col w-full pl-4 sm:pl-10 lg:px-30 py-8">
            <ProfileHeader />
            <ProfileTabs />
            <ProfilePosts handleOpenModal={handleOpenModal}/>
            <PostModal isOpen={isOpen} handleCloseModal={handleCloseModal} image='/img1.png' username='beastgamergs' pfp='/img1.png' />
        </div> 
    )
}

export default ProfilePage