export default function Notifications() {
    return (
        <div>
            <div className="flex gap-4 justify-center md:justify-start items-center rounded-4xl hover:bg-gray-600 w-full h-10 md:pl-3 duration-150
                            hover:scale-[1.01]">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                <p className="font-semibold hidden md:block">Notifications</p>
            </div>
        </div>
    )
}