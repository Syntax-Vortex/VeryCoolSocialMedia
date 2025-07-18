import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useErrorPopup from "./useErrorPopup";
import useUserProfileStore from "../store/userProfileStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetUserPosts(){
    const [isLoading, setIsLoading] = useState(true);
    const {posts, setPosts} = usePostStore()
    const {showErrorPopup, ErrorPopup} = useErrorPopup();
    const {userProfile} = useUserProfileStore();

    useEffect(() => {
        const getPosts = async () => {
            if(!userProfile) return;
            setIsLoading(true);
            setPosts([]);
            try {
                const q = query(collection(firestore, 'posts'), where('createdBy', '==', userProfile.uid));
                const querySnap = await getDocs(q);
                const fetchedPosts = [];
                querySnap.docs.forEach(post => {
                    fetchedPosts.push({...post.data(), id:post.id})
                });

                fetchedPosts.sort((a,b) => b.createdAt - a.createdAt);
                setPosts(fetchedPosts)

            } catch (error) {
                showErrorPopup(error.message);
                setPosts([]);
            }finally{
                setIsLoading(false);
            }
        }

        if(userProfile) getPosts();
    },[userProfile, setPosts, showErrorPopup]);

    return {isLoading, posts, ErrorPopup}
}