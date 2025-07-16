import { useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import usePreviewPostImages from '../../../../Hooks/usePreviewPostImages';
import useCreatePost from '../../../../Hooks/useCreatePost';

export default function CreatePostModal(props) {
    const { isOpen, handleCloseModal } = props
    const [caption, setCaption] = useState('');
    const [theme, setTheme] = useState('gradient-lavender');
    const imageRef = useRef(null);
    const { selectedFiles, selectedFileStrings, handleImageChange, handleImageRemove, setSelectedFiles,setSelectedFileStrings, ErrorPopup } = usePreviewPostImages();
    const {isLoading, uploadPost, ErrorPopup: UploadError, showErrorPopup} = useCreatePost();

    if (!isOpen) return null;

    async function handleUploadPost() {
        const result = await uploadPost(caption, selectedFiles, theme);
        if (result) {
            setSelectedFiles(null);
            setSelectedFileStrings(null);
            setCaption('');
            handleCloseModal();
        } else{
            showErrorPopup('Upload Failed');
        }
    }


    return ReactDOM.createPortal((
        <div className='fixed inset-0 w-[100vw] h-[100vh] bg-black/50 z-10 text-white'>
            <ErrorPopup />
            <UploadError />
            <div className="fixed flex items-center justify-center inset-0 bg-black/50">
                <div className='flex flex-col gap-4 w-[95%] sm:w-[70%] md:w-[50%] lg:w-[35%] h-[85%] bg-black rounded-xl border-2 border-gray-300'>
                    <div className='w-full flex justify-center items-center h-[30px] px-3 pt-2'>
                        <div className='ml-auto text-[20px] font-semibold'>Create a post</div>
                        <button className='font-semibold text-[44px] text-white hover:text-gray-400 duration-150 ml-auto'
                            onClick={() => {
                                setSelectedFiles(null);
                                setSelectedFileStrings(null);
                                setCaption('');
                                handleCloseModal();
                            }}>
                            <svg className='size-5' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 2.5l11 11m0-11l-11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                    </div>

                    <textarea className='min-h-[80px] h-[20%] bg-gray-300/10 mx-4 resize-none overflow-auto sleek-scrollbar outline-0 border-2 border-gray-300/50
                                rounded-xl px-0.5' placeholder='Enter a caption for your post' value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                    <div className='flex flex-col gap-0.5 mx-4'>
                        <p className='text-gray-300/95'>Add images</p>
                        <div className='w-full flex flex-nowrap overflow-x-auto sleek-scrollbar items-center justify-start bg-black h-[130px] gap-2'>

                                {selectedFileStrings?.map((file,index) => {
                                    return(
                                        <div className="h-[95%] min-w-1/4 lg:min-w-1/6 rounded-xl overflow-hidden flex justify-center items-center relative hover:bg-gray-300/17 duration-150
                                                "key={index}>
                                            <img className='h-full w-full object-cover' src={file} />
                                            <div className='absolute inset-0 flex justify-center items-center bg-black/80 opacity-0 hover:opacity-100 duration-150'
                                                    onClick={() => {handleImageRemove(index)}}>
                                                <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                            </div>
                                        </div>
                                    )
                                })}
                            

                            <button className="h-[95%] min-w-1/4 lg:min-w-1/6 rounded-xl flex justify-center items-center hover:bg-gray-300/17 duration-150"
                                    onClick={() => imageRef.current.click()}>
                                <svg className="w-10 h-10"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="3"strokeLinecap="round"strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </button>
                            <input className='hidden' type='file' multiple accept="image/*" ref={imageRef} onChange={handleImageChange}/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mx-4'>
                        <p className='text-gray-300/95'>Choose a theme</p>
                        <div className='w-full flex flex-wrap gap-6 items-center justify-start bg-black'>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-lavender" className="hidden peer" onChange={(e) => setTheme(e.target.value)} checked/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-lavender peer-checked:border-white peer-checked:border-4"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-indigo" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-indigo peer-checked:border-white peer-checked:border-4"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-rose" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-rose peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-coral" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-coral peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-teal" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-teal peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-midnight" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-midnight peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-ember" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-ember peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-carbon" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-carbon peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-amethyst" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-amethyst peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-bronze" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-bronze peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-slate" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-slate peer-checked:border-white peer-checked:border-3"></div>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="radio" name="theme" value="gradient-crimsonsoft" className="hidden peer" onChange={(e) => setTheme(e.target.value)}/>
                                <div className="w-[30px] md:w-[40px] lg:w-[50px] aspect-square rounded-full border-2 border-gray-300/50 gradient-crimsonsoft peer-checked:border-white peer-checked:border-3"></div>
                            </label>
                        </div>
                    </div>

                    <div className='flex w-full flex-1 justify-center items-center gap-4'>
                        <button className='bg-red-700/80 text-[20px] rounded-[10px] px-4 py-1 text-white hover:bg-red-700/50 hover:text-white/50 duration-150'
                            onClick={() => {
                                setSelectedFiles(null);
                                setSelectedFileStrings(null);
                                setCaption('');
                                handleCloseModal();
                            }}>
                            Cancel
                        </button>

                        <button className='bg-blue-700/80 text-[20px] rounded-[10px] px-6 py-1 text-white hover:bg-blue-700/50 hover:text-white/50 duration-150'
                            onClick={handleUploadPost}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ), document.getElementById('portal'))
}