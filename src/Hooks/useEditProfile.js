import { useState } from "react";
import useAuthStore from "../store/authStore";
import useErrorPopup from "./useErrorPopup";

export default function useEditProfile(){
    const [ isUpdating, setIsUpdating ] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const { showErrorPopup, hideErrorPopup, ErrorPopup} = useErrorPopup();

    const editProfile = (inputs, selectedFile) => {
        if(isUpdating || !authUser){
            return;
        }
        setIsUpdating(true);
    }
}