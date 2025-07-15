import { useState } from "react";
import useErrorPopup from "./useErrorPopup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

export default function useSearchUser(){
    const [isLoading, setIsLoading] = useState(false);
    const [users,setUsers] = useState(null);
    const {showErrorPopup, hideErrorPopup, ErrorPopup} = useErrorPopup();
    const authUser = useAuthStore((state) => state.user);

    const getUserProfile = async (search) => {
        setIsLoading(true)
        setUsers(null);

        try {
            const q = query(collection(firestore, 'users'), where('username', '>=', search),where('username', '<', search + '\uf8ff'));
            
            const querrySnap = await getDocs(q);
            if(querrySnap.empty){
                showErrorPopup('User not found');
            }else{
                const matchedUsers = querrySnap.docs.map(doc => doc.data());
                setUsers(matchedUsers);
            }
        } catch (error) {
            showErrorPopup(error.message);
            setUsers(null);
        }finally{
            setIsLoading(false);
        }
    }

    return {isLoading, getUserProfile, users, ErrorPopup, setUsers}
}