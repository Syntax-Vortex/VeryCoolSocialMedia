import { useState } from "react";
import useAuthStore from "../store/authStore";
import useErrorPopup from "./useErrorPopup";
import useSuccessPopup from "./useSuccessPopup";
import { firestore, storage } from "../firebase/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function useEditProfile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const { showSuccessPopup, hideSuccessPopup, SuccessPopup } = useSuccessPopup();

    const editProfile = async (inputs, selectedFile, selectedFileString) => {
        if (isUpdating || !authUser) {
            return;
        }
        setIsUpdating(true);

        let pfpUrl = authUser.pfp;

        try {
            setUpdatedSuccessfully(false);
            if (selectedFileString) {
                const storageRef = ref(storage, `profilePics/${authUser.uid}`);
                await uploadString(storageRef, selectedFileString, "data_url");
                pfpUrl = await getDownloadURL(storageRef);
            }else if(selectedFileString === 'removed'){
                pfpUrl = '';
            }

            // Only check username availability if it's different from current username
            if (inputs.username !== authUser.username) {
                const usersRef = collection(firestore, 'users');
                const q = query(usersRef, where('username', '==', inputs.username));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    showErrorPopup("Error: username already exists");
                    return false; // Return false to indicate failure
                }
            }

            const updatedUser = {
                uid: authUser.uid,
                email: authUser.email,
                username: inputs.username || authUser.username,
                fullname: inputs.fullname || authUser.fullname,
                bio: inputs.bio || authUser.bio,
                pfp: pfpUrl,
                followers: authUser.followers || [],
                following: authUser.following || [],
                posts: authUser.posts || [],
                createdAt: authUser.createdAt
            }

            const userDocRef = doc(firestore, 'users', authUser.uid);
            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem('user-info', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setUserProfile(updatedUser);

            setUpdatedSuccessfully(true);
            showSuccessPopup("Profile updated successfully!");
            return true; // Return true to indicate success

        } catch (error) {
            console.error('Edit profile error:', error);
            showErrorPopup(error.message || "Failed to update profile");
            return false; // Return false to indicate failure
        } finally {
            setIsUpdating(false);
        }
    }

    return { editProfile, isUpdating, ErrorPopup, SuccessPopup, updatedSuccessfully };
}