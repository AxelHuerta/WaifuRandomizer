import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useWaifuData } from "../store/Store";

export default function Favorites() {
  const { favoriteWaifus } = useWaifuData((state) => state);
  console.log(favoriteWaifus.length);

  return (
    <div className="bg-black min-h-screen">
      {/* navbar */}
      <Navbar />
      {favoriteWaifus.length > 0 ? (
        <main className="pt-24 mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold">Favoritos</h1>
          <span className="m-auto">No hay favoritos aún</span>
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
