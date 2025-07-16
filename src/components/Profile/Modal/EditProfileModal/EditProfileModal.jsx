import ReactDOM from 'react-dom'
import useAuthStore from '../../../../store/authStore';
import { useRef, useState, useEffect } from 'react';
import usePreviewing from '../../../../Hooks/usePreviewing';
import useEditProfile from '../../../../Hooks/useEditProfile';
import usePfpUpdatedAt from '../../../../store/usePfpUpdatedAt';
import MinimalLoader from '../../../misc/MinimalLoader';

function EditProfileModal(props) {
    const authUser = useAuthStore((state) => state.user)
    const { isOpen, handleCloseModal } = props;
    const fileRef = useRef(null);
    const { selectedFile, selectedFileString, handleImageChange,handleImageRemove, setSelectedFile, ErrorPopup } = usePreviewing();
    const { editProfile, isUpdating, ErrorPopup: EditProfileErrorPopup, SuccessPopup } = useEditProfile();
    const { pfpUpdatedAt } = usePfpUpdatedAt();
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        bio: ''
    });

    // Update inputs when modal opens or authUser changes
    useEffect(() => {
        if (isOpen && authUser) {
            setInputs({
                fullname: authUser.fullname || '',
                username: authUser.username || '',
                bio: authUser.bio || ''
            });
        }
    }, [isOpen, authUser]);


    if (!isOpen) return null;

    async function handleEditProfile() {
        try {
            const success = await editProfile(inputs, selectedFile, selectedFileString);
            
            if (success) {
                setSelectedFile(null);
                handleCloseModal();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return ReactDOM.createPortal((
        <div className='flex items-center bg-black/50 justify-center fixed inset-0'>
            <ErrorPopup />
            <EditProfileErrorPopup />
            <SuccessPopup />
            <div className='flex flex-col h-[50%] justify-start items-center bg-black z-10 text-white border-2 border-[#49434A] rounded-3xl pt-1'>
                <p className='text-2xl font-semibold'>Edit Profile</p>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-2 mx-6 ml-8'>
                        <img className='rounded-full size-40' src={selectedFileString? (selectedFileString==='removed')? '/defpfp.png' : selectedFileString : authUser.pfp? `${authUser.pfp}?t=${pfpUpdatedAt}` : '/defpfp.png'}></img>
                        <div className='flex items-center justify-center gap-0.5'>
                            <button className='bg-[#282529] rounded-xl py-1 px-4 border-1 border-solid border-[#3C373D] hover:bg-[#353036] duration-100
                                    ' onClick={() => { fileRef.current.click() }}>
                                <svg className='w-[14px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                            </button>
                            <input className='hidden' type='file' ref={fileRef} onChange={(e) => { handleImageChange(e) }} />
                            <button className='bg-[#282529] rounded-xl py-1 px-4 border-1 border-solid border-[#3C373D] hover:bg-[#353036] duration-100'
                                    onClick={handleImageRemove}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className='h-[85%] w-[2px] bg-[#49434A]/70 mx-4'> </div>
                    <div className='flex flex-col px-6 pr-8 justify-start'>
                        <div className='flex gap-3'>
                            <div className='flex flex-col gap-8'>
                                <p>Full Name: </p>
                                <p>Username:</p>
                                <p>Bio:</p>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-8'>
                                <input className='outline-0 border-b-2 border-[#49434A] w-[400px]' value={inputs.fullname} type='text'
                                    onChange={(e) => {
                                        const newInputs = {
                                            fullname: e.target.value,
                                            username: inputs.username,
                                            bio: inputs.bio
                                        }
                                        setInputs(newInputs);
                                    }} />

                                <input className='outline-0 border-b-2 border-[#49434A] w-[400px]' value={inputs.username} type='text'
                                    onChange={(e) => {
                                        const newInputs = {
                                            fullname: inputs.fullname,
                                            username: e.target.value,
                                            bio: inputs.bio
                                        }
                                        setInputs(newInputs);
                                    }} />

                                <input className='outline-0 border-b-2 border-[#49434A] w-[400px]' value={inputs.bio} type='text'
                                    onChange={(e) => {
                                        const newInputs = {
                                            fullname: inputs.fullname,
                                            username: inputs.username,
                                            bio: e.target.value
                                        }
                                        setInputs(newInputs);
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-6'>
                    <button className='text-xl text-red-500 font-bold border-2 border-red-700/70 mb-4 rounded-2xl py-1.5 px-6 hover:bg-red-500 duration-150
                                    hover:text-white' onClick={() => {
                            setSelectedFile(null);
                            handleCloseModal();
                        }} disabled={isUpdating}>
                        Cancel
                    </button>
                    <button className='text-xl text-blue-500 font-bold border-2 border-blue-700/70 mb-4 rounded-2xl py-1.5 px-6 hover:bg-blue-500
                                        duration-150 hover:text-white' onClick={handleEditProfile} disabled={isUpdating}>
                        {isUpdating? (<MinimalLoader />) : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    ), document.getElementById('portal'))
}

export default EditProfileModal