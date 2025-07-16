import { useEffect, useState } from "react";
import useAuthStore from '../store/authStore'
import useErrorPopup from './useErrorPopup'
import {firestore} from '../firebase/firebase'
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export default function useGetSuggestedUsers(){
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState(null);
    const authUser = useAuthStore((state) => state.user);
    const {showErrorPopup, hideErrorPopup, ErrorPopup} = useErrorPopup();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);

            try {
                const q = query(collection(firestore, 'users'), where('uid', 'not-in', [authUser.uid, ...authUser.following]), orderBy('uid'), limit(5));
                const querySnap = await getDocs(q);
                const users = querySnap.docs.map((doc)=>{return {...doc.data(), id: doc.id}});
                setSuggestedUsers(users);

            } catch (error) {   
                showErrorPopup(error.message);
            }finally{
                setIsLoading(false);
            }
        }

        if(authUser) getSuggestedUsers();
    },[authUser])

    return {isLoading, suggestedUsers, ErrorPopup}
}