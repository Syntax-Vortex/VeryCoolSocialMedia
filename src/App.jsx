import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import './index.css'
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase"

function App() {
    const [user] = useAuthState(auth);

    

    return (
        <PageLayout>
            <Routes>
                <Route path='/' element={user? <HomePage /> : <Navigate to={'/auth'} />} />
                <Route path='/auth' element={user? <Navigate to={'/'} /> : <AuthPage />} />
                <Route path='/:username' element={<ProfilePage />} />
            </Routes>
        </PageLayout>
    )
}

export default App
