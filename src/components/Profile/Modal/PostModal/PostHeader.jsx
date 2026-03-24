import useAuthStore from "../../../../store/authStore";
import useErrorPopup from "../../../../Hooks/useErrorPopup";
import { useState } from "react";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../../../firebase/firebase";
import usePostStore from "../../../../store/postStore";
import useUserProfileStore from "../../../../store/userProfileStore";
import MinimalLoader from "../../../misc/MinimalLoader";
import getRelativeTime from "../../../../utils/getRelativeTime";
import { deleteObject, ref } from "firebase/storage";

function PostHeader(props) {

    const { username, pfp, caption, createdBy, createdAt, id, handleCloseModal, images } = props;
    const authUser = useAuthStore((state) => state.user);
    const { showErrorPopup, ErrorPopup } = useErrorPopup();
    const [isDeleting, setIsDeleting] = useState(false);
    const { deletePost } = usePostStore();
    const { removePost } = useUserProfileStore();

    const relativeTime = getRelativeTime(createdAt);

    async function handleDeletePost() {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        setIsDeleting(true);
        try {
            await Promise.all(
                images?.map(async (url) => {
                    const storageRef = ref(storage, url);
                    await deleteObject(storageRef);
                })
            );

            await deleteDoc(doc(firestore, 'posts', id));

            const userDocRef = doc(firestore, 'users', authUser.uid);
            const docSnap = await getDoc(userDocRef);
            const userDocData = docSnap.data();
            if (userDocData && userDocData.posts) {
                await updateDoc(userDocRef, {
                    posts: userDocData.posts.filter(postId => postId !== id)
                });
            }

            deletePost(id);
            removePost(id);

            handleCloseModal();

        } catch (error) {
            showErrorPopup(error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="w-full flex flex-col gap-2 lg:gap-4">
            <ErrorPopup />
            <div className="flex justify-start items-center w-full gap-2 lg:gap-4 psd-2">
                <img className="size-10 rounded-full shadow-2xl" src={pfp} />
                <div className="flex flex-col justify-center">
                    <div className="flex text-[12px] lg:text-[16px] font-medium gap-2">
                        {username}
                    </div>
                    <div className="text-gray-400 text-[10px] lg:text-[16px]">
                        {relativeTime}
                    </div>
                </div>
                {(authUser?.uid == createdBy) && <button className="text-[12px] md:text-[15px] text-white hover:text-red-800 duration-150 cursor-pointer ml-auto"
                    onClick={handleDeletePost} disabled={isDeleting}>
                    {isDeleting ? (<MinimalLoader />) : <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>}
                </button>}
            </div>

            <div>
                <p className="text-[12px] md:text-[14px] lg:text-[16px]">
                    {caption}
                </p>
            </div>
        </div>
    )
}

export default PostHeader;