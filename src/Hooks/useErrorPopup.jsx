import { useCallback, useState } from 'react';

export default function useErrorPopup(){
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const showErrorPopup = useCallback((message) => {
        setErrorMessage(message);
        setShowError(true);
        console.log(errorMessage, 'error', showError)
        // Auto-hide after 5 seconds
        setTimeout(() => {
            setShowError(false);
            setErrorMessage('');
        }, 5000);
    },[])

    const hideErrorPopup = () => {
        setShowError(false);
        setErrorMessage('');
    };

    const ErrorPopup = () => {
        if (!showError) return null;
        
        return (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between">
                    <p>{errorMessage}</p>
                    <button 
                        onClick={hideErrorPopup}
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        x
                    </button>
                </div>
            </div>
        );
    };

    return { showErrorPopup, hideErrorPopup, ErrorPopup };
}