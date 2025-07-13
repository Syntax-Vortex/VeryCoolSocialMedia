function UserNotFound(){
    return(
        <div className="flex items-start justify-center w-full h-full p-11">
            <div className="w-[90%] lg:w-[60%] bg-red-500 rounded-3xl flex flex-col items-center justify-start px-4 pb-4">
                <p className="font-semibold text-white text-[20px] sm:text-[28px] md:text-[40px]">!User not found</p>
                <hr className="w-[95%]"></hr>
                <p className="text-[12px] sm:text-[16px] md:text-[20px] px-2">Oops! The user you're looking for doesn't exist. Please check the username in the URL and try again</p>
            </div>
        </div>
    )
}  

export default UserNotFound