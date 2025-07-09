import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

function SignInForm() {

    const [isLogin, setIsLogin] = useState(true);
    

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
            
            {isLogin? (<Login />) : (<Signup />)}

            <div className="flex items-center justify-center w-[80vw] sm:w-full max-w-[350px]">
                {isLogin ? (
                    <p>Dont have an account? <button className="text-violet-500 cursor-pointer" onClick={() => setIsLogin(false)}>Sign up</button></p>
                ) : (
                    <p>Already have an account? <button className="text-violet-500 cursor-pointer" onClick={() => setIsLogin(true)}>Sign in</button></p>
                )}
            </div>
            <hr className="bg-gray-800 w-[80vw] sm:w-full max-w-[350px] opacity-30" />
            
            <GoogleAuth />

        </div>
    )
}

export default SignInForm;