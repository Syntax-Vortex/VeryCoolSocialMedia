import ReactDOM from 'react-dom'
import PostHeader from './PostHeader';
import FullPostFooter from './FullPostFooter';

function PostModal(props) {

    const { isOpen, handleCloseModal, image, username, pfp } = props;

    { if (!isOpen) return null; }

    return ReactDOM.createPortal(
        (
            <div className="w-full h-full fixed inset-0 flex items-start justify-center">
                <button className='w-full h-full bg-black/50 absolute inset-0' onClick={handleCloseModal}></button>
                <div className="z-10 flex flex-col sm:flex-row justify-start items-center w-[60%] gap-3 mt-10 gradient-sage px-3 sm:px-7 py-4 rounded-3xl
                        border border-white/5 duration-150 text-white h-[90vh] overflow-y-scroll sm:overflow-y-auto">

                    <div className='w-full sm:w-[60%] flex flex-col items-start h-full'>
                        <PostHeader username={username} pfp={pfp} />

                        <div className='flex flex-col gap-3 overflow-y-scroll max-h-[70vh] scrollbar-hide'>
                            <div className="w-full flex items-center justify-start my-1.5 gap-5 flex-wrap">
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                                <img className="w-[35%] sm:w-[30%] rounded-[5px] shadow-xl" src={image} />
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-gray-400/30 hidden sm:block h-[90%] w-[1px]'>

                    </div>

                    <div className='flex flex-col h-full flex-1'>
                        <FullPostFooter />
                    </div>
                </div>
            </div>
        ), document.getElementById('portal')
    )
}

export default PostModal