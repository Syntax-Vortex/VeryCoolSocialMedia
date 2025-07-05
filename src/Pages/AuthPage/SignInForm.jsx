import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    function handleAuth() {
        if (!inputs.email || !inputs.password) {
            alert("Please fill out all the fields");
            return;
        }
        if (!isLogin && !inputs.confirmPassword) {
            alert("Please fill out all the fields");
            return;
        }

        navigate('/');
    }

    return (
        <div className="flex flex-col justify-center items-start  sm:px-5 md:px-8 lg:pl-28 gap-5 ">
            <div className="mb-3">
                <p className="font-bold text-2xl sm:text-xl mb-1.5">
                    {isLogin ? 'Sign in to your account.' : 'Sign up for a new account.'}
                </p>
                <p className="sm:text-[15px] text-[10px] font-thin">
                    {isLogin ? "Let's sign in to your account and get started" : "Let's create a new account and get started"}
                </p>
            </div>
            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Email address</p>

                <div className="relative sm:w-full">
                    <svg className="absolute inset-0 left-3 top-1.5 lucide lucide-mail-icon lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input className="absolute inset-0 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] pl-10 border-2 border-[#85C2FF] border-solid outline-0"
                        value={inputs.email} onChange={(e) => {
                            const obj = {
                                email: e.target.value,
                                password: inputs.password,
                                confirmPassword: inputs.confirmPassword
                            }
                            setInputs(obj);
                        }} type="text" />
                </div>
            </div>
            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Password</p>

                <div className="relative sm:w-full">
                    <svg className="absolute inset-0 left-[12px] top-[5px] lucide lucide-lock-keyhole-icon lucide-lock-keyhole" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                    <input className="absolute inset-0 outline-0 pl-10 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] border-2 border-[#85C2FF] border-solid"
                        value={inputs.password} onChange={(e) => {
                            const obj = {
                                email: inputs.email,
                                password: e.target.value,
                                confirmPassword: inputs.confirmPassword
                            }
                            setInputs(obj);
                        }} type="password" />
                </div>
            </div>
            {!isLogin ? (
                <div className="mb-6 sm:w-full">
                    <p className="font-thin text-[15px] pl-2.5">Confirm password</p>

                    <div className="relative sm:w-full">
                        <svg className="absolute inset-0 left-[12px] top-[5px] lucide lucide-lock-keyhole-icon lucide-lock-keyhole" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                        <input className="absolute inset-0 outline-0 pl-10 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] border-2 border-[#85C2FF] border-solid"
                            value={inputs.confirmPassword} onChange={(e) => {
                                const obj = {
                                    email: inputs.email,
                                    password: inputs.password,
                                    confirmPassword: e.target.value
                                }
                                setInputs(obj);
                            }} type="password" />
                    </div>
                </div>
            ) : null}
            <button className=" h-9 w-[80vw] sm:w-full max-w-[350px] bg-violet-700 rounded-full cursor-pointer" onClick={() => { handleAuth() }}>
                {isLogin ? 'Sign in' : 'Sign up'}
            </button>
            <div className="flex items-center justify-center w-[80vw] sm:w-full max-w-[350px]">
                {isLogin ? (
                    <p>Dont have an account? <button className="text-violet-500 cursor-pointer" onClick={() => setIsLogin(false)}>Sign up</button></p>
                ) : (
                    <p>Already have an account? <button className="text-violet-500 cursor-pointer" onClick={() => setIsLogin(true)}>Sign in</button></p>
                )}
            </div>
            <hr className="bg-gray-800 w-[80vw] sm:w-full max-w-[350px] opacity-30" />
            <div className="flex items-center justify-center sm:w-full w-[80vw] max-w-[350px]">
                <button className="border border-solid border-gray-700 px-10 py-3 rounded-2xl cursor-pointer">
                    <img className="w-5 h-auto" src="/google.png" />
                </button>
            </div>
        </div>
    )
}

export default SignInForm;