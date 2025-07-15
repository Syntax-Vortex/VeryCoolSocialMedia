import Home from "./Home";
import Notifications from "./Notifications";
import Create from './Create'
import Search from "./Search";
export default function SidebarItems(){
    return(
        <div className="w-full h-10 flex flex-col gap-4">
            <Home />
            <Search />
            <Notifications />
            <Create />
        </div>
    )
}