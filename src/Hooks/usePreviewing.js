import { useState } from "react";
import useErrorPopup from './useErrorPopup'

export default function usePreviewing(){
    const [selectedFile, setSelectedFile] = useState();
    const { showErrorPopup, HideErrorPopup, ErrorPopup } = useErrorPopup();
    const maxFileSizeInBytes = 5 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith('image/')){
            if(file.size >= maxFileSizeInBytes) {
                showErrorPopup('Error: max file size is 5mb');
                setSelectedFile(null);
                return;
            }

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            }
            
        }else{
            showErrorPopup('Error selecting an image');
            setSelectedFile(null);
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile, ErrorPopup };
}