import ReactDOM from 'react-dom'
import PostHeader from './PostHeader';
import FullPostFooter from './FullPostFooter';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../../firebase/firebase';
import { useEffect, useState } from 'react';
import useErrorPopup from '../../../../Hooks/useErrorPopup';

function PostModal(props) {
    const { showErrorPopup, ErrorPopup } = useErrorPopup();
    const { isOpen, handleCloseModal, post } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getPostOwner = async () => {
            if (!post) return;
            try {
                const q = query(collection(firestore, 'users'), where('uid', '==', post.createdBy));
                const querySnap = await getDocs(q);
                const userData = querySnap?.docs[0]?.data();
                setUser(userData || null);
            } catch (error) {
                showErrorPopup(error.message);
                setUser(null);
            }
        };

        if (isOpen && post) {
            getPostOwner();
        }
    }, [isOpen, post]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        (
            <div className="w-full h-full fixed inset-0 flex items-start justify-center">
                <button className='w-full h-full bg-black/50 absolute inset-0' onClick={handleCloseModal}></button>
                <div className={`z-10 flex flex-col sm:flex-row justify-start items-center w-[90%] sm:w-[80%] gap-3 mt-10 ${post.theme} px-3 sm:px-7 py-4 rounded-3xl
                        border border-white/5 duration-150 text-white h-[90vh] overflow-y-scroll sm:overflow-y-auto`}>

                    <div className='w-full sm:w-[50%] flex flex-col items-start h-full'>
                        <PostHeader username={user?.username} pfp={user?.pfp || '/defpfp.png'} caption={post?.caption}
                            createdBy={post.createdBy} createdAt={post.createdAt} id={post.id} handleCloseModal={handleCloseModal} images={post.images}/>

                        <div className='flex flex-col gap-3 overflow-y-auto max-h-[70vh] w-full gradient-scrollbar'>
                            <div className="w-full flex items-center justify-start my-1.5 gap-5 flex-wrap">
                                {post.images?.length > 0 ? post.images.map(image => {
                                    return (
                                        <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                    )
                                }) : (
                                    <div className="flex flex-col justify-center items-center text-gray-300/50 mx-auto mt-10">
                                        <svg className="size-7 lucide lucide-image-off-icon lucide-image-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="2" x2="22" y1="2" y2="22" /><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" /><line x1="13.5" x2="6" y1="13.5" y2="21" /><line x1="18" x2="21" y1="12" y2="15" /><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" /><path d="M21 15V5a2 2 0 0 0-2-2H9" /></svg>
                                        <p className="">This post has no images!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-400/30 hidden sm:block h-[90%] w-[1px]'>

                    </div>

                    <div className='flex flex-col h-full flex-1'>
                        <FullPostFooter post={post}/>
                    </div>
                </div>
            </div>
        ), document.getElementById('portal')
    )
}

export default PostModal