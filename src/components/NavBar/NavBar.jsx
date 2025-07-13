import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="flex flex-col fixed inset-0 w-[100vw] h-[40px] sm:h-[70px] gap-3 items-center">
            <div className="w-full flex justify-center sm:justify-between items-center px-22 pt-3 gap-6">
                <svg className="w-[50px] aspect-square lucide lucide-instagram-icon lucide-instagram" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>

                <div className="flex justify-center items-center gap-2">
                    <Link className="border-2 border-white/90 text-[12px] sm:text-[18px] py-[8px] px-4 rounded-2xl hover:bg-white/90 hover:text-black
                                 duration-150" to={'/auth'}>
                        Login
                    </Link>

                    <Link className="border-2 border-blue-600 text-[12px] sm:text-[18px] py-2 px-4 rounded-2xl hover:bg-blue-600 duration-150" to={'/auth'}>
                        SignUp
                    </Link>
                </div>
            </div>
            <hr className="w-[90%] text-gray-700"></hr>
        </div>

    )
}