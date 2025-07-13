import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useErrorPopup from "./useErrorPopup";
import useSuccessPopup from "./useSuccessPopup";
import { auth, firestore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import { DocumentSnapshot } from 'firebase/firestore';

export default function useLogin(){
    const { showSuccessPopup, hideSuccessPopup, SuccessPopup } = useSuccessPopup();
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
                localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
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