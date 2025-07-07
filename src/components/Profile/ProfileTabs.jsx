function ProfileTabs(){
    return(
        <div>
        <div className="flex gap-10 justify-center items-center mt-10">
            <div className="flex justify-start items-center gap-2 hover:text-gray-400 duration-150 px-1 pb-[3px] border-b sm:border-b-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <p className="hidden sm:block">Posts</p>
            </div>

            <div className="flex justify-start items-center gap-2  hover:text-gray-400 duration-150 px-1 pb-[3px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                <p className="hidden sm:block">Saved</p>
            </div>

            <div className="flex justify-start items-center gap-2  hover:text-gray-400 duration-150 px-1 pb-[3px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <p className="hidden sm:block">Liked</p>
            </div>
        </div>
        <hr className="text-gray-400 opacity-20"></hr>
        </div>
    )
}

export default ProfileTabs