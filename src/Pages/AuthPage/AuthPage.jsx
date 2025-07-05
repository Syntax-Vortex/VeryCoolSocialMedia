import SignInForm from "./SignInForm";
import bgImage from "../../assets/bg.jpg";

function AuthPage(){
    return(
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center sm:grid sm:grid-cols-10">
            <div className="col-span-6 relative h-full w-auto hidden sm:block">
                <img src={bgImage} alt="Background" className="h-full w-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black" />
            </div>
            <div className="col-span-4 bg-black">
                <SignInForm />
            </div>
        </div>
    )
}

export default AuthPage;