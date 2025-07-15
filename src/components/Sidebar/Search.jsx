import { useState } from "react"
import SearchModal from "./modals/SearchModal/SearchModal";

export default function Search() {

    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={handleOpenModal}>
                <div className="flex gap-4 justify-center md:justify-start items-center rounded-4xl hover:bg-gray-600 w-full h-10 md:pl-3 duration-150
                            hover:scale-[1.01]">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
                    <p className="font-semibold hidden md:block">Search</p>
                </div>
            </button>
            <SearchModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
        </>

    )
}