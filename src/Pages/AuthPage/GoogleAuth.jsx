import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import useAuthStore from "../../store/authStore";
import useErrorPopup from "../../Hooks/useErrorPopup.jsx";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';

function GoogleAuth() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const { showErrorPopup, hideErrorPopup, ErrorPopup } = useErrorPopup();
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showErrorPopup(error.message || "Failed to sign in with Google");
                return;
            }

            const userRef = doc(firestore, 'users', newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                
                const userDoc = userSnap.data();
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                loginUser(userDoc);

            }else if(newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split('@')[0],
                    fullname: newUser.user.displayName || 'User',
                    bio: '',
                    pfp: newUser.user.photoURL || '/defpfp.png',
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
            console.error('Google Auth Error:', error);
            showErrorPopup(error.message || "An error occurred during Google sign-in");
        }
    }

    return (
        <>
            <div className="flex items-center justify-center sm:w-full w-[80vw] max-w-[350px]">
                <button 
                    className="border border-solid border-gray-700 px-10 py-3 rounded-2xl cursor-pointer hover:bg-gray-800 duration-150 disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={handleGoogleAuth}
                    disabled={loading}>
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <img className="w-5 h-auto" src="/google.png" alt="Google" />
                    )}
                </button>
            </div>
            <ErrorPopup />
        </>
    )
}

export default GoogleAuth