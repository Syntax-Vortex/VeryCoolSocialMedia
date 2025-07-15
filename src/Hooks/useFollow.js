import { useEffect, useState } from "react";
import useAuthStore from '../store/authStore'
import useUserProfileStore from '../store/userProfileStore'
import useErrorPopup from '../Hooks/useErrorPopup'
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useFollow(userID){
    const [isUpdating, setIsUpdating ] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const {user: authUser, setUser} = useAuthStore();
    const {userProfile, setUserProfile} = useUserProfileStore();
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();

    useEffect(() => {
        if(authUser){
            const following = authUser.following.includes(userID);
            setIsFollowing(following);
        }
    },[authUser, userID]);

    const handleFollow = async () => {
        setIsUpdating(true);

        try {
            const currentUserRef = doc(firestore, 'users', authUser.uid);
            const otherUserRef = doc(firestore, 'users', userID);

            if(authUser.uid === userID){
                showErrorPopup('Cant follow yourself');
                return;
            }

            await updateDoc(currentUserRef, {
                following: isFollowing? arrayRemove(userID) : arrayUnion(userID)
            });

            await updateDoc(otherUserRef, {
                followers: isFollowing? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            if(isFollowing){
                setUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userID)
                })

                // Only update userProfile if it exists and if the userProfile is the user being unfollowed
                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                    })
                }

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userID)
                }));
                setIsFollowing(false);

            }else{
                setUser({
                    ...authUser,
                    following: [...authUser.following, userID]
                })

                // Only update userProfile if it exists and if the userProfile is the user being followed
                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    })
                }

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userID]
                }));
                setIsFollowing(true);
            }

        } catch (error) {
            showErrorPopup(error.message);
        }finally{
            setIsUpdating(false);
        }
    }

    return {isUpdating, isFollowing, handleFollow, ErrorPopup}
}