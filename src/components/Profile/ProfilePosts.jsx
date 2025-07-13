import ProfilePost from "./ProfilePost"
import '../../SleekScrollbar.css'

function ProfilePosts( props ){
    const { handleOpenModal } = props;
    return(
        <div className="w-full flex flex-wrap mt-3 gap-y-3 overflow-y-auto mb-5 sleek-scrollbar">
            <ProfilePost img='/img1.png' caption='beastgamergs is a gaming beast' likes='420' comments='69' handleOpenModal={handleOpenModal} />
            <ProfilePost img='/img2.png' caption='beastgamergs is also a damn fuckin awsome nigga' likes='111' comments='111' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img3.png' caption='beastgamergs is ungodly lmao' likes='123' comments='0' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img1.png' caption='beastgamergs is a gaming beast' likes='420' comments='69' handleOpenModal={handleOpenModal} />
            <ProfilePost img='/img2.png' caption='beastgamergs is also a damn fuckin awsome nigga' likes='111' comments='111' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img3.png' caption='beastgamergs is ungodly lmao' likes='123' comments='0' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img1.png' caption='beastgamergs is a gaming beast' likes='420' comments='69' handleOpenModal={handleOpenModal} />
            <ProfilePost img='/img2.png' caption='beastgamergs is also a damn fuckin awsome nigga' likes='111' comments='111' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img3.png' caption='beastgamergs is ungodly lmao' likes='123' comments='0' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img1.png' caption='beastgamergs is a gaming beast' likes='420' comments='69' handleOpenModal={handleOpenModal} />
            <ProfilePost img='/img2.png' caption='beastgamergs is also a damn fuckin awsome nigga' likes='111' comments='111' handleOpenModal={handleOpenModal}/>
            <ProfilePost img='/img3.png' caption='beastgamergs is ungodly lmao' likes='123' comments='0' handleOpenModal={handleOpenModal}/>
        </div>
    )
}

export default ProfilePosts