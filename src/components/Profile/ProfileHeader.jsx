function ProfileHeader(){
    return(
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center gap-4 sm:gap-10">
            <img className="size-12 sm:size-20 md:size-30 aspect-square rounded-full" src="/img1.png" />

            <div className="flex flex-col justify-center items-start">
                
                <p className="font-semibold text-[18px] lg:text-[28px] flex items-center justify-start gap-5 w-full">
                    Gurseerat Singh
                    <button className="text-[14px] text-black bg-gray-300 p-2 sm:p-2 sm:px-3 rounded-full ml-auto mr-4 sm:mx-0 hover:bg-gray-500 
                                duration-150">
                        Edit Profile
                    </button>
                </p>

                <p className="font-medium text-gray-300 text-[16px] sm:text-[20px] mb-2">beastgamergs</p>

                <div className="flex justify-start items-center gap-4">

                    <p className="font-thin"><span className="font-bold">114</span> Posts</p>
                    <p className="font-thin"><span className="font-bold">114</span> Following</p>
                    <p className="font-thin"><span className="font-bold">114</span> Followers</p>
                    
                </div>

                <p className="font-light pt-2">
                    This is just a really really elongated test bio
                </p>
            </div>
        </div>
    )
}

export default ProfileHeader