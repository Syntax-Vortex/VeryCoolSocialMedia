import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useErrorPopup from "./useErrorPopup";
import useAuthStore from "../store/authStore";

export default function useLogout(){
    const [signOut, loading, error] = useSignOut(auth);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const logoutUser = useAuthStore(state => state.logout)

    const  handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
        } catch (error) {
            showErrorPopup(error.message);
        }
    }

    return {handleLogout, loading, error, ErrorPopup};
}