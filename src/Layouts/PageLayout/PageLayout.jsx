import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import NavBar from "../../components/NavBar/NavBar";
import PageLayoutLoader from "../../components/misc/PageLayoutLoader";

function PageLayout(props){

    const { children } = props;
    const {pathname} = useLocation();
    const [user,loading,error] = useAuthState(auth)
    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavBar = pathname !== '/auth' && !user && !loading

    const checkingIsUserAuth = !user && loading;
    if(checkingIsUserAuth) return <PageLayoutLoader />

    return(
        <div className={"flex justify-start bg-black text-white" + (canRenderNavBar? ' flex-col px-5 md:px-30' : '')}>
            {canRenderSidebar? (
                <div className="w-[70px] md:w-[300px]">
                    <Sidebar />
                </div>
            ) : null}

            {canRenderNavBar? (
                <NavBar />
            ) : null}

            <div className="flex-1">
                {children}
            </div>

        </div>
    )
}

export default PageLayout;