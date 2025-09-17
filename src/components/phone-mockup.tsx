interface Props {
  imageUrl: string | null;
  loading: boolean;
  color: string | undefined;
}

export default function PhoneMockup({ imageUrl, loading, color }: Props) {
  return (
    <div>
      <div className={`mockup-phone`} style={{ borderColor: color }}>
        <div
          className={`mockup-phone-display grid bg-[url(${imageUrl})] bg-cover bg-center cursor-pointer`}
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            if (modal) modal.showModal();
          }}
        >
          {!loading && imageUrl ? (
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {imageUrl && <img src={imageUrl} alt="Waifu image" />}
        </div>
      </dialog>
    </div>
  );
}
