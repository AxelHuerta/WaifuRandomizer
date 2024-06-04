import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useWaifuData } from "./store/Store";
import Navbar from "./components/Navbar";
import { Data } from "./types/Data";
import { Tag } from "./types/Tag";

// TODO: refactor this component
export function App() {
  const baseURL = "https://api.waifu.im/search";
  const [waifuImage, setWaifuImage] = useState("");
  const [tag, setTag] = useState("");
  const [extension, setExtension] = useState(".jpg");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // zustand
  const { favoriteWaifus, setFavoriteWaifus } = useWaifuData((state) => state);

  // TODO: repetitive code
  const getRandomWaifu = async () => {
    setIsLoading(true);
    await axios.get(baseURL).then((res) => {
      setWaifuImage(res.data.images[0].url);
      setAllTags(res.data.images[0].tags);
      setExtension(res.data.images[0].extension);

      // is saved
      setIsFavorite(
        isInFavorites(res.data.images[0].url)
        // favoriteWaifus.includes(res.data.images[0].url) ? true : false,
      );
    });
  };

  const isInFavorites = (url: string) => {
    let isFound = false;
    favoriteWaifus.forEach((waifu) => {
      if (waifu.url == url) isFound = true;
    });
    return isFound;
  };

  const getEspecificTagWaifu = async () => {
    if (tag == "") {
      return;
    }
    await axios.get(`${baseURL}?included_tags=${tag}`).then((res) => {
      setWaifuImage(res.data.images[0].url);
      setAllTags(res.data.images[0].tags);
      setExtension(res.data.images[0].extension);

      // // is saved
      // setIsFavorite(
      //   favoriteWaifus.includes(res.data.images[0].url) ? true : false,
      // );

      setIsFavorite(
        isInFavorites(res.data.images[0].url)
        // favoriteWaifus.includes(res.data.images[0].url) ? true : false,
      );

      console.log("Is in favorite: ", isInFavorites(res.data.images[0].url));
    });
  };

  const handleTagForm = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(!isFavorite);
      setFavoriteWaifus(
        favoriteWaifus.filter((favorite: Data) => {
          favorite.url !== waifuImage;
        })
      );
      return;
    }

    setFavoriteWaifus([...favoriteWaifus, { tags: allTags, url: waifuImage }]);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isFirstTime) {
      getRandomWaifu();
      setIsFirstTime(false);
    }
    const img = new Image();
    img.src = waifuImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [waifuImage]);

  return (
    <div className={"min-h-screen text-white bg-base"}>
      {/* navbar */}
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 lg:gap-8 items-center p-12">
        <div className="flex flex-col justify-center items-center mt-8">
          {/* main image */}
          <div className="relative">
            {isLoading ? (
              <div className={`flex justify-center items-center`}>
                <span className="loading loading-spinner loading-lg mr-2"></span>
                <p className="text-xl font-bold">Loading...</p>
              </div>
            ) : (
              <>
                <img
                  src={waifuImage}
                  alt="No cargo la waifu 😔"
                  className="rounded-lg max-h-[70vh]"
                  loading="lazy"
                />
                {/* btns */}
                <div className="absolute bottom-12 right-2">
                  {/* favorite btn */}
                  <button
                    className="bg-[rgba(0,0,0,.7)] p-1 mr-1 rounded-2xl"
                    onClick={handleFavorite}
                  >
                    <span className="text-2xl font-bold">
                      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                    </span>
                  </button>

                  {/* donwload btn */}
                  <a
                    href={waifuImage}
                    download={`WaifuImage${extension}`}
                    target="_blank"
                  >
                    <button className="bg-[rgba(0,0,0,.7)] p-1 rounded-2xl">
                      <span className="text-2xl font-bold">
                        <AiOutlineCloudDownload />
                      </span>
                    </button>
                  </a>
                </div>
                {/* badges */}
                <div className="mt-4">
                  {allTags.length > 0
                    ? allTags.map((tag, index) => {
                        return (
                          <div className="badge mr-1" key={index}>
                            {tag.name}
                          </div>
                        );
                      })
                    : null}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col lg:flex-row py-4 justify-center">
            {/* random btn */}
            <button className="btn glass mb-4 lg:mr-4" onClick={getRandomWaifu}>
              Random
            </button>
            {/* tag form */}
            <div className="form-control" onChange={handleTagForm}>
              <div className="input-group grid grid-cols-2">
                <select className="select select-bordered">
                  <option>Selecciona un tag</option>
                  <option value="waifu">waifu</option>
                  <option value="maid">maid</option>
                  <option value="marin-kitagawa">marin-kitagawa</option>
                  <option value="mori-calliope">mori-calliope</option>
                  <option value="raiden-shogun">raiden-shogun</option>
                  <option value="oppai">oppai</option>
                  <option value="selfies">selfies</option>
                  <option value="uniform">uniform</option>
                </select>
                <button className="btn glass" onClick={getEspecificTagWaifu}>
                  Por tag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
