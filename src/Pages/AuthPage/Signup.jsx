import { useState } from "react";
import useEmailPasswordSignUp from '../../Hooks/useEmailPasswordSignUp'
import '../../loader.css'

function Signup() {

    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        email: '',
        password: ''

    })

    const [ showPassword, setShowPassword ] = useState(false);
    const { loading, error, signUp, ErrorPopup } = useEmailPasswordSignUp();

    

    return (
        <>
            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Full name</p>

                <div className="relative sm:w-full">
                    <svg className="absolute inset-0 left-3 top-1.5 lucide lucide-mail-icon lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input className="absolute inset-0 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] pl-10 border-2 border-[#85C2FF] border-solid outline-0"
                        value={inputs.fullname} onChange={(e) => {
                            const obj = {
                                fullname: e.target.value,
                                username: inputs.username,
                                email: inputs.email,
                                password: inputs.password
                            }
                            setInputs(obj);
                        }} type="text" />
                </div>
            </div>

            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Username</p>

                <div className="relative sm:w-full">
                    <svg className="absolute inset-0 left-3 top-1.5 lucide lucide-mail-icon lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                    <input className="absolute inset-0 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] pl-10 border-2 border-[#85C2FF] border-solid outline-0"
                        value={inputs.username} onChange={(e) => {
                            const obj = {
                                fullname: inputs.fullname,
                                username: e.target.value,
                                email: inputs.email,
                                password: inputs.password
                            }
                            setInputs(obj);
                        }} type="text" />
                </div>
            </div>

            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Email address</p>

                <div className="relative sm:w-full">
                    <svg className="absolute inset-0 left-3 top-1.5 lucide lucide-mail-icon lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input className="absolute inset-0 bg-[#6290BD] opacity-27 rounded-full h-9 w-[80vw] sm:w-full max-w-[350px] pl-10 border-2 border-[#85C2FF] border-solid outline-0"
                        value={inputs.email} onChange={(e) => {
                            const obj = {
                                fullname: inputs.fullname,
                                username: inputs.username,
                                email: e.target.value,
                                password: inputs.password
                            }
                            setInputs(obj);
                        }} type="email" />
                </div>
            </div>

            <div className="mb-6 sm:w-full">
                <p className="font-thin text-[15px] pl-2.5">Password</p>

                <div className="relative w-[80vw] sm:w-full max-w-[350px]">
                    <svg className="absolute inset-0 left-[12px] top-[5px] lucide lucide-lock-keyhole-icon lucide-lock-keyhole" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                    <input className="absolute inset-0 outline-0 px-10 bg-[#6290BD] opacity-27 rounded-full h-9 w-full  border-2 border-[#85C2FF] border-solid"
                        value={inputs.password} onChange={(e) => {
                            const obj = {
                                fullname: inputs.fullname,
                                username: inputs.username,
                                email: inputs.email,
                                password: e.target.value
                            }
                            setInputs(obj);
                        }} type={showPassword? 'text' : 'password'} />
                    
                    <button className="absolute right-[12px] top-[5px]" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                        ) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>)}    
                    </button>
                </div>
            </div>
            
            <ErrorPopup />

            <button className=" h-9 w-[80vw] sm:w-full max-w-[350px] bg-violet-700 rounded-full cursor-pointer flex justify-center items-center" onClick={() => {signUp(inputs)}}>
                {loading? (<div className="loader text-[7px] font-semibold"></div>) : 'Sign Up'}
                
            </button>
        </>
    )
}

export default Signup