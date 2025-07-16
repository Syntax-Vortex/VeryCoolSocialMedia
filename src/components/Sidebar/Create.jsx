import { useState } from "react"
import CreatePostModal from "./modals/CreatePostModal/CreatePostModal";

export default function Create() {
    const [isOpen, setIsOpen] = useState(false);

    function handleCloseModal() {
        setIsOpen(false)
    }

    function handleOpenModal() {
        setIsOpen(true)
        console.log(isOpen)
    }

    return (
        <>
            <button>
                <div className="flex gap-4 justify-center md:justify-start items-center rounded-4xl hover:bg-gray-600 w-full h-10 md:pl-3 duration-150
                            hover:scale-[1.01]" onClick={handleOpenModal}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-plus-icon lucide-badge-plus"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
                    <p className="font-semibold hidden md:block">Create</p>
                </div>
            </button>
            
            <CreatePostModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
        </>
    )
}