import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function PageLayout(props){

    const { children } = props;
    const {pathname} = useLocation();

    return(
        <div className="flex justify-start bg-black text-white">
            {pathname !== '/auth'? (
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