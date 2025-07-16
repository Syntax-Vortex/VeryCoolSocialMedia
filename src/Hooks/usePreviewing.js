import { useState } from "react";
import useErrorPopup from './useErrorPopup'

export default function usePreviewing(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileString, setSelectedFileString] = useState('');
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const maxFileSizeInBytes = 5 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file =  e.target.files[0];
        if(file && file.type.startsWith('image/')){
            if(file.size >= maxFileSizeInBytes) {
                showErrorPopup('Error: max file size is 5mb');
                setSelectedFile(null);
                setSelectedFileString('');
                return;
            }

            setSelectedFile(file);
            console.log('File selected:', file); // For debugging

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFileString(reader.result);
            }
            reader.readAsDataURL(file);
            
        } else {
            showErrorPopup('Error: Please select a valid image file');
            setSelectedFile(null);
            setSelectedFileString('');
        }
    }

    const handleImageRemove = () => {
        setSelectedFile(null);
        setSelectedFileString('removed');
    }

    return { selectedFile, selectedFileString, handleImageChange,handleImageRemove, setSelectedFile, ErrorPopup };
}