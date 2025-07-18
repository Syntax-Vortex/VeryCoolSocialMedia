export default function NoResults(){
    return(
        <div className="w-full flex justify-center items-start pt-10 text-white">
            <div className="flex flex-col justify-center items-center">
                <svg  class="size-8 sm:size-10 md:size-11 lg:size-12 lucide lucide-user-round-x-icon lucide-user-round-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>
                <p className="font-semibold text-[12px] sm:text-[16px] md:text-xl lg:text-2xl">No Results!</p>
            </div>
        </div>
    )
}