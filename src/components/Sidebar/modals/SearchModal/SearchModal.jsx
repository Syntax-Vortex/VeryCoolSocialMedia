import ReactDOM from 'react-dom'
import useSearchUser from '../../../../Hooks/useSearchUser';
import { useRef } from 'react';
import Suggestion from '../../../SuggestedUsers/Suggestion';
import MinimalLoader from '../../../misc/MinimalLoader';
import useFollow from '../../../../Hooks/useFollow';
import useAuthStore from '../../../../store/authStore';
import NoResults from './NoResults';

export default function SearchModal(props) {
    const { isOpen, handleCloseModal } = props
    const {isLoading, getUserProfile, users, ErrorPopup, setUsers} = useSearchUser();
    const searchRef = useRef(null);
    const authUser = useAuthStore((state) => state.user);

    if (!isOpen) return null;

    function handleSearch(){
        getUserProfile(searchRef.current.value);
    }

    return ReactDOM.createPortal((
        <div className="fixed flex items-center justify-center inset-0 bg-black/50">
            <ErrorPopup />
            <div className='flex flex-col gap-1 w-[95%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-[70%] bg-black rounded-xl border-2 border-gray-300'>
                <div className='w-full flex justify-end items-center h-[30px] px-3 pt-2'>
                    <button className='font-semibold text-[44px] text-white hover:text-gray-400 duration-150' onClick={() => { setUsers(null); handleCloseModal() }}>
                        <svg className='size-5' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 2.5l11 11m0-11l-11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                </div>

                <div className='flex items-center border-b-2 border-gray-300 text-gray-100 mx-6 px-1 mt-3'>
                    <input className='w-full outline-0 ' type='text' placeholder='Search (username)' ref={searchRef}/>
                    <button className='font-semibold text-[34px] text-white hover:text-gray-400 duration-150' onClick={handleSearch}>
                        {isLoading? (<MinimalLoader />) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>)}
                    </button>
                </div>

                <div className='flex flex-col gap-2 flex-1 mx-6 my-4 overflow-x-clip overflow-y-auto sleek-scrollbar'>
                    {users? users.map((user, index) => {
                        return(
                            <div key={index}>
                                <Suggestion user={user} />
                            </div>
                        );
                    }) : (<NoResults />)}
                </div>
            </div>
        </div>
    ), document.getElementById('portal'))
}