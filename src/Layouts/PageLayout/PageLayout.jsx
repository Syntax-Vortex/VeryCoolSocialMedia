import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

function PageLayout(props){

    const { children } = props;
    const {pathname} = useLocation();
    const [user,loading,error] = useAuthState(auth)
    const canRenderSidebar = pathname !== '/auth' && user;

    return(
        <div className="flex justify-start bg-black text-white">
            {canRenderSidebar? (
                <div className="w-[70px] md:w-[300px]">
                    <Sidebar />
                </div>
            ) : null}

            <div className="flex-1">
                {children}
            </div>

        </div>
    )
}

export default PageLayout;