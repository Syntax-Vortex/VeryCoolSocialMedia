import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import useErrorPopup from './useErrorPopup';
import useAuthStore from '../store/authStore';

function useEmailPasswordSignUp(){
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)

    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const loginUser = useAuthStore(state => state.login);

    const signUp = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            showErrorPopup("Please fill out all the fields");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser && error){
                showErrorPopup(error.message || "Failed to create user");
                return;
            }

            if(newUser){
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: '',
                    pfp: '',
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }

                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showErrorPopup(error.message || "An error occurred during signup");
        }
    }

    return { error, loading, signUp, ErrorPopup };
}

export default useEmailPasswordSignUp