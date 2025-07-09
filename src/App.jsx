import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import './index.css'
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import useAuthStore from "./store/authStore"

function App() {
    const user = useAuthStore(state => state.user);

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
