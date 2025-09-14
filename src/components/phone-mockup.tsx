interface Props {
  imageUrl: string;
  loading: boolean;
}

export default function PhoneMockup({ imageUrl, loading }: Props) {
  return (
    <div>
      <div className="mockup-phone">
        <div
          className={`mockup-phone-display grid bg-[url(${imageUrl})] bg-cover bg-center cursor-pointer`}
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            if (modal) modal.showModal();
          }}
        >
          {!loading ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="skeleton flex justify-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          )}
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="w-screen h-screen flex justify-center  backdrop-blur-md bg-black/50">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <img src={imageUrl} alt="Waifu image" />
        </div>
      </dialog>
    </div>
  );
}
