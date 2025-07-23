import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useErrorPopup from "./useErrorPopup";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetFeedPosts(){
    const [isLoading, setIsLoading] = useState(true);
    const {posts, setPosts} = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const {showErrorPopup, hideErrorPopup, ErrorPopup} = useErrorPopup();
    const {setUserProfile} = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async() => {
            setIsLoading(true);
            
            // Add debugging logs
            console.log('Auth User:', authUser);
            console.log('Following array:', authUser?.following);
            
            if(!authUser?.following || authUser.following.length === 0){
                setIsLoading(false);
                setPosts([]);
                return;
            }
            const q = query(collection(firestore, 'posts'), where('createdBy', 'in', authUser.following))

            try {
                const querySnap = await getDocs(q);
                const feedPosts = [];
                
                querySnap.forEach(doc => feedPosts.push({id: doc.id, ...doc.data()}));

                feedPosts.sort((a,b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);

            } catch (error) {
                showErrorPopup(error.message);
            }finally{
                setIsLoading(false);
            }
        }

        if(authUser) getFeedPosts();
    },[authUser, showErrorPopup, setPosts, setUserProfile]);

    return {isLoading, posts}
}