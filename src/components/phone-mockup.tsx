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
          className={`mockup-phone-display relative bg-[url(${imageUrl})] bg-cover bg-center cursor-pointer`}
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            if (modal) modal.showModal();
          }}
        >
          {!loading && imageUrl ? (
            <>
              <div className="absolute bottom-5 right-5">
                <button className="btn btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="size-[1.2em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </>
          ) : (
            <div className="skeleton flex justify-center h-full">
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
