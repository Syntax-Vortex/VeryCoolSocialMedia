import useAuthStore from "../../store/authStore"
import SuggestedUsersHeader from "./SuggestedUsersHeader"
import Suggestion from "./Suggestion"
import useGetSuggestedUsers from '../../Hooks/useGetSuggestedUsers'

function SuggestedUsers() {
    const authUser = useAuthStore((state) => state.user);
    const { isLoading, suggestedUsers, ErrorPopup } = useGetSuggestedUsers();

    return (
        <div className="flex flex-col items-start gap-3 py-10">
            <ErrorPopup />
            <p className="font-bold text-[25px] p-0 m-0">Suggested for you</p>
            <div className="flex flex-col gap-2 items-start w-full pr-10">
                {suggestedUsers?.map(user => {
                    return (
                        <div className="w-full" key={user.id}>
                            <Suggestion user={user}/>
                        </div>
                    )
                })}
            </div>
            <button className="text-[12px] md:text-[15px] text-blue-500 hover:text-white duration-150 cursor-pointer px-2 hover:scale-[1.01]">
                See all
            </button>
        </div>
    )
}

export default SuggestedUsers