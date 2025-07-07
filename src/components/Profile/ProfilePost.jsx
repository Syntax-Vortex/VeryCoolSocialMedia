function ProfilePost(props) {
    const { img, caption, likes, comments, handleOpenModal } = props;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 h-40 px-2">
      <div className="h-full w-full rounded-3xl gradient-lavender flex flex-col p-2 gap-2 hover:scale-[1.01] duration-150 relative group" onClick={handleOpenModal}>
        <p className="text-gray-300 line-clamp-2">
          {caption}
        </p>

        <hr className="text-gray-300 opacity-40" />

        <div className="flex-1 flex gap-2 items-center justify-center overflow-hidden">
          <img src={img} className="h-full w-auto object-contain rounded-lg"/>
        </div>

        <div className="inset-0 absolute justify-center items-center bg-black/40 opacity-100 hidden group-hover:flex w-full h-full backdrop-blur-[1px] gap-5">
            <div className="font-semibold flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <p>{likes}</p>
            </div>
            
            <div className="font-semibold flex items-center justify-center gap-1">
                <svg className="size-5 lg:size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                <p>{comments}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePost;
