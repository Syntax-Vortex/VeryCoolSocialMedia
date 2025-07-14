import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import useAuthStore from "../../store/authStore";
import usePfpUpdatedAt from "../../store/usePfpUpdatedAt";

function Sidebar() {

    const buttons = [{
        name: 'Home',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
        link: '/'
    },{
        name: 'Search',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',
    },{
        name: 'Notifications',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',
    },{
        name: 'Create',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-plus-icon lucide-badge-plus"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>'
    }];

    const logoutSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>';

    const {handleLogout, loading, error, ErrorPopup } = useLogout();
    const authUser = useAuthStore((state) => state.user);
    const { pfpUpdatedAt } = usePfpUpdatedAt();
    if(!authUser) return null;

    return (
        <div className="h-[100vh] py-8 sticky top-0 left-0 px-2 md:px-4 w-full">
            <div className="flex flex-col items-center w-full h-full gap-10">

                <Link className="flex flex-col items-center min-w-[130px] py-2 hover:bg-gray-700 rounded-4xl duration-150" to={`/${authUser.username}`}>
                    <img className="h-9 md:h-20 w-9 md:w-20 mb-2 rounded-full object-cover" src={`${authUser.pfp}?t=${pfpUpdatedAt}`} alt="Profile"/>
                    <p className="font-semibold hidden md:block">{authUser.fullname}</p>
                    <p className="font-thin hidden md:block">@{authUser.username}</p>
                </Link>

                <div className="flex flex-col justify-center items-start gap-7 w-[80%]">
                    {buttons.map((button, index) => {
                        return(
                            <Link className="flex gap-4 justify-center md:justify-start items-center rounded-4xl hover:bg-gray-600 w-full h-10 md:pl-3 duration-150 hover:scale-[1.01]" to={button.link || ''} key={index}>
                                <div dangerouslySetInnerHTML={{ __html: button.svg }} />
                                <p className="font-semibold hidden md:block">{button.name}</p>
                            </Link>
                        )
                    })}
                </div>
                <ErrorPopup />
                <button className="flex gap-4 justify-center md:justify-start items-center rounded-4xl hover:bg-red-900 w-[80%] h-10 md:pl-3 duration-150 mt-auto hover:scale-[1.01]"
                        onClick={() => {handleLogout()}}>
                    <div dangerouslySetInnerHTML={{__html: logoutSVG}}></div>
                    <p className="font-semibold hidden md:block">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;