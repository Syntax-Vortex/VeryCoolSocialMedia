export default function NoPosts(){
    return(
        <div className="w-full flex flex-col justify-center items-center text-gray-400 pt-5">
            <svg className="size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-x2-icon lucide-file-x-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 12.5-5 5"/><path d="m3 12.5 5 5"/></svg>
            <p className="text-[18px]">Looks like you have no recommendations</p>
            <p className="text-[14px]">Please follow some users to see their posts</p>
        </div>
    )
}