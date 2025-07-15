import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import useAuthStore from "../../store/authStore";
import usePfpUpdatedAt from "../../store/usePfpUpdatedAt";
import SidebarItems from "./SidebarItems";

function Sidebar() {
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
                    <SidebarItems />
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