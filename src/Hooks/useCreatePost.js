import { useState } from "react";
import useErrorPopup from "./useErrorPopup";
import useAuthStore from '../store/authStore'
import { doc, addDoc, getDoc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import usePostStore from "../store/postStore";
import { supabase } from "../../supabaseClient";

export default function useCreatePost() {
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const { showErrorPopup, hideRrrorPopup, ErrorPopup } = useErrorPopup();
    const { addPost } = useUserProfileStore();
    const { createPost } = usePostStore();

    const uploadPost = async (caption, selectedFiles, theme) => {
        if (!caption && !selectedFiles) {
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
            let picUrls =[];
            if (selectedFiles) {
                const filePath = `postPics/${postDocRef.id}`;
                picUrls = await Promise.all(
                    selectedFiles.map((file, index) =>
                        supabase.storage.from('images').upload(`${filePath}/${index}`, file)
                            .then(() => {
                                const url = (supabase.storage.from('images').getPublicUrl(`${filePath}/${index}`).data.publicUrl);
                                return url;
                            })
                    )
                )
                await updateDoc(postDocRef, { images: picUrls });
            }

            const userDocRef = doc(firestore, 'users', authUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userDocData = userDocSnap.data()
            await updateDoc(userDocRef,{posts: [postDocRef.id, ...(userDocData.posts || [])]})

            newPostDoc.images = picUrls;
            addPost({...newPostDoc, id:postDocRef.id});
            createPost({...newPostDoc, id:postDocRef.id});
            
            return true;
        } catch (error) {
            showErrorPopup(error.message);
            return false;
        }finally{
            setIsLoading(false);
        }
    }

    return {isLoading, uploadPost, ErrorPopup}

}