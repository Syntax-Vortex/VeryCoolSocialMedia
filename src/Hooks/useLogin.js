import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useErrorPopup from "./useErrorPopup";
import useSuccessPopup from "./useSuccessPopup";
import { auth, firestore } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import useAuthStore from '../store/authStore'

export default function useLogin(){
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)
    const loginUser = useAuthStore((state) => state.login)

    const login = async (inputs) => {
        if(!inputs.email || !inputs.password){
                showErrorPopup('Please fill all the fields');
                return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)

            if(userCred){
                const docRef = doc(firestore, 'users', userCred.user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    localStorage.setItem('user-info', JSON.stringify(userData));
                    loginUser(userData);
                } else {
                    showErrorPopup('User data not found');
                    return;
                }
            }else{
                showErrorPopup('Invalid credentials');
                return;
            }

        } catch (error) {
            showErrorPopup(error.message)
        }   
    }

    return { loading, error, login, ErrorPopup };
}