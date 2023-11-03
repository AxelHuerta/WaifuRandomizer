import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useWaifuData } from "../store/Store";

export default function Favorites() {
  const { favoriteWaifus } = useWaifuData((state) => state);

  return (
    <div className="bg-black min-h-screen">
      {/* navbar */}
      <Navbar />
      {favoriteWaifus.length > 0 ? (
        <main className="pt-24 mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold my-4">Favoritos</h1>
          <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* cards */}
            {favoriteWaifus.map((waifu) => {
              return (
                <div className="card glass" key={waifu.url}>
                  <figure
                    className={"h-[400px] bg-cover"}
                    style={{
                      background: `url(${waifu.url})`,
                      backgroundSize: "cover",
                    }}
                  ></figure>
                  <div className="card-body">
                    {/* badges */}
                    <div>
                      {waifu.tags.length > 0
                        ? waifu.tags.map((tag, index) => {
                            return (
                              <div
                                className="badge badge-outline mr-1"
                                key={index}
                              >
                                {tag.name}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      ) : (
        <div className="hero min-h-screen">
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
