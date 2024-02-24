import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useWaifuData } from "../store/Store";
import { useState } from "react";
import { Data } from "../types/Data";

export default function Favorites() {
  const { favoriteWaifus, setFavoriteWaifus } = useWaifuData((state) => state);
  const [currentImage, setCurrentImage] = useState<Data>({
    url: "",
    tags: [],
  });

  const removeFavorite = () => {
    const auxiliarArray = favoriteWaifus.filter(
      (item) => item.url !== currentImage.url
    );
    setFavoriteWaifus(auxiliarArray);
  };

  return (
    <div className="bg-base min-h-screen">
      {/* modal */}
      <dialog id="modal" className="modal backdrop-blur bg-base">
        <div className="max-h-[95vh]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <img
              src={currentImage.url}
              className="mt-4 rounded-md max-h-[70vh]"
              loading="lazy"
            />
            {/* badges */}
            <div className="mt-2">
              {currentImage.tags.length > 0
                ? currentImage.tags.map((tag, index) => {
                    return (
                      <div className="badge badge-outline mr-1" key={index}>
                        {tag.name}
                      </div>
                    );
                  })
                : null}
            </div>

            <button className="btn btn-neutral my-4" onClick={removeFavorite}>
              Remover
            </button>
          </form>
        </div>
      </dialog>

      {/* navbar */}
      <Navbar />
      {favoriteWaifus.length > 0 ? (
        <main className="pt-24 mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold my-4">Favoritos</h1>
          <div className="mx-4 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-red">
            {/* cards */}
            {favoriteWaifus.map((waifu) => {
              return (
                <div
                  className="artboard h-[500px] rounded-md"
                  style={{
                    background: `url(${waifu.url})`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    setCurrentImage({ url: waifu.url, tags: waifu.tags });
                    document.getElementById("modal").showModal();
                  }}
                ></div>
              );
            })}
          </div>
        </main>
      ) : (
        <div className="hero min-h-screen bg-base">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Favoritos</h1>
              <p className="py-6">No hay favoritos guardados aún</p>
              <Link to={"/"}>
                <button className="btn btn-success">Volver</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
