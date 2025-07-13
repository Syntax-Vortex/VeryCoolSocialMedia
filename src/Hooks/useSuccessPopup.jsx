import { useState } from 'react';

export default function useSuccessPopup(){
    const [SuccessMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const showSuccessPopup = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage('');
        }, 5000);
    };

    const hideSuccessPopup = () => {
        setShowSuccess(false);
        setSuccessMessage('');
    };

    const SuccessPopup = () => {
        if (!showSuccess) return null;
        
        return (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between">
                    <p>{SuccessMessage}</p>
                    <button 
                        onClick={hideSuccessPopup}
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        x
                    </button>
                </div>
            </div>
        );
    };

    return { showSuccessPopup, hideSuccessPopup, SuccessPopup };
}