import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="flex flex-col fixed inset-0 w-[100vw] h-[40px] sm:h-[70px] items-center">
            <div className="w-full flex justify-center sm:justify-between items-end px-65 pt-3 gap-6">
                <img className="w-35 h-auto hover:scale-[1.01] duration-300" src="/name.png"/>

                <div className="flex justify-center items-center gap-2">
                    <Link className="border-b-2 border-transparent hover:border-white/90 hover:sm:text-[21px] text-[16px] sm:text-[20px] px-4 duration-150" to={'/auth'}>
                        Login
                    </Link>

                    <Link className="border-b-2 border-transparent hover:border-blue-500 hover:sm:text-[21px] text-blue-500 text-[16px] sm:text-[20px] px-4 duration-150" to={'/auth'}>
                        SignUp
                    </Link>
                </div>
            </div>
            <hr className="w-[90%] text-gray-700"></hr>
        </div>

    )
}