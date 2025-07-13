import { useEffect, useState } from "react";
import useErrorPopup from "./useErrorPopup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

export default function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched ] = useState(false);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const {userProfile, setUserProfile} = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(firestore, 'users'), where('username', '==', username));
                const querySnap = await getDocs(q);

                if(querySnap.empty){
                    setUserProfile(null);
                } else {
                    let userDoc;
                    querySnap.forEach(user => {
                        userDoc = user.data();
                    });
                    setUserProfile(userDoc);
                    console.log('User found:', userDoc);
                }
            } catch (error) {
                showErrorPopup(error.message);
            } finally {
                setIsLoading(false);
                setHasFetched(true);
            }
        };

        if (username) {
            getUserProfile();
        }

    }, [setUserProfile, username, showErrorPopup]);

    return {isLoading, hasFetched, userProfile, ErrorPopup};
}