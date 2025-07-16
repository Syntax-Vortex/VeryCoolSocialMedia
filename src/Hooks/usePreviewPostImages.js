import { useState } from "react";
import useErrorPopup from './useErrorPopup'

export default function usePreviewPostImages() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectedFileStrings, setSelectedFileStrings] = useState(null);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const maxFileSizeInBytes = 5 * 1024 * 1024;

    const filesToBase64 = (files) => {
        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    resolve(reader.result); // this will be the base64 string
                };

                reader.onerror = reject;

                reader.readAsDataURL(file);
            });
        });

        return Promise.all(promises); // resolves to an array of base64 strings
    };



    const handleImageChange = async (e) => {
        const files = [...e.target.files];

        if (files) {
            let allImages = 1;
            let sizeValid = 1;
            files.forEach(file => {
                if (!file.type.startsWith('image/')) {
                    allImages = 0;
                }
                if (file.size >= maxFileSizeInBytes) {
                    sizeValid = 0;
                }
            })
            if (!allImages) {
                showErrorPopup('Error: Please upload only images');
                setSelectedFiles(null);
                setSelectedFileStrings(null);
                return;
            } else if (!sizeValid) {
                showErrorPopup('Error: max file size is 5mb');
                setSelectedFiles(null);
                setSelectedFileStrings(null);
                return;
            }

            const base64Strings = await filesToBase64(files);

            if (selectedFileStrings && selectedFiles) {
                const newSelectedFiles = [...selectedFiles, ...files]
                setSelectedFiles(newSelectedFiles);
                const newSelectedFileStrings = [...selectedFileStrings, ...base64Strings]
                setSelectedFileStrings(newSelectedFileStrings);
            }else{
                setSelectedFileStrings(base64Strings);
                setSelectedFiles(files);
            }

        } else {
            showErrorPopup('Error: Please select a valid image file');
            setSelectedFiles(null);
            setSelectedFileStrings(null);
        }
    }

    const handleImageRemove = (index) => {
        if (selectedFiles && selectedFileStrings) {
            const newSelectedFiles = selectedFiles.filter((file, i) => i !== index);
            const newSelectedFileStrings = selectedFileStrings.filter((fileString, i) => i !== index);
            setSelectedFiles(newSelectedFiles.length > 0 ? newSelectedFiles : null);
            setSelectedFileStrings(newSelectedFileStrings.length > 0 ? newSelectedFileStrings : null);
        }
    }

    return { selectedFiles, selectedFileStrings, handleImageChange, handleImageRemove, setSelectedFiles,setSelectedFileStrings, ErrorPopup };
}