import { useState } from "react";
import useErrorPopup from "./useErrorPopup";
import useAuthStore from '../store/authStore'
import { doc, addDoc, getDoc, collection, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import usePostStore from "../store/postStore";
import { useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function useCreatePost() {
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const { showErrorPopup, hideRrrorPopup, ErrorPopup } = useErrorPopup();
    const { addPost, userProfile } = useUserProfileStore();
    const { createPost } = usePostStore();
    const location = useLocation();
    const pathname = location.pathname;

    const uploadPost = async (caption, selectedFileStrings, theme) => {
        if (!caption && !selectedFileStrings?.length > 0) {
            showErrorPopup('Please enter a caption or select images');
            return;
        }

        setIsLoading(true);

        const newPostDoc = {
            caption: caption || '',
            images: [],
            theme: theme,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid
        }

        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPostDoc);
            let picUrls = [];
            if (selectedFileStrings?.length > 0) {
                picUrls = await Promise.all(
                    selectedFileStrings.map(async (fileString, index) => {
                        const storageRef = ref(storage, `postPics/${postDocRef.id}/${index}`);
                        await uploadString(storageRef, fileString, "data_url");
                        const url = await getDownloadURL(storageRef);
                        return url;
                    }

                    )
                )
                await updateDoc(postDocRef, { images: picUrls });
            }

            const userDocRef = doc(firestore, 'users', authUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userDocData = userDocSnap.data()
            await updateDoc(userDocRef, { posts: [postDocRef.id, ...(userDocData.posts || [])] })

            newPostDoc.images = picUrls;
            if (pathname !== '/' && userProfile.uid === authUser.uid) addPost({ ...newPostDoc, id: postDocRef.id });
            if (userProfile.uid === authUser.uid) createPost({ ...newPostDoc, id: postDocRef.id });

            return true;
        } catch (error) {
            showErrorPopup(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, uploadPost, ErrorPopup }

}