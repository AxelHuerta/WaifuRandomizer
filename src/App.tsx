import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";

type Tag = {
  id: number;
  name: string;
  description: string;
  isNsfw: boolean;
};

export function App() {
  const baseURL = "https://api.waifu.im/search";
  const [waifuImage, setWaifuImage] = useState("");
  const [tag, setTag] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const getRandomWaifu = () => {
    axios.get(baseURL).then((res) => {
      setWaifuImage(res.data.images[0].url);
      setAllTags(res.data.images[0].tags);
    });
  };

  const getEspecificTagWaifu = () => {
    axios.get(`${baseURL}?included_tags=${tag}`).then((res) => {
      setWaifuImage(res.data.images[0].url);
      setAllTags(res.data.images[0].tags);
    });
  };

  const handleTagForm = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    getRandomWaifu();
    // setWaifuImage("https://cdn.waifu.im/7752.jpg");
  }, []);

  return (
    <div
      className={"min-h-screen text-white"}
      style={{ background: `url('${waifuImage}')` }}
    >
      <div className="bg-[rgba(0,0,0,.5)] min-h-screen backdrop-blur-3xl grid grid-cols-1 lg:grid-cols-3 lg:gap-8 items-center p-12">
        <div className="flex flex-col justify-center items-center">
          {/* main image */}
          <img
            src={waifuImage}
            alt="No cargo la waifu 😔"
            className="rounded-lg max-h-[70vh]"
          />
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
        </div>

        <div className="col-span-2">
          <h1 className="font-bold text-white text-3xl text-center">
            WaifuRandomizer
          </h1>
          <div className="flex flex-col lg:flex-row py-4 justify-center">
            {/* random btn */}
            <button className="btn glass mb-4 lg:mr-4" onClick={getRandomWaifu}>
              Random
            </button>
            {/* tag form */}
            <div className="form-control" onChange={handleTagForm}>
              <div className="input-group grid grid-cols-2">
                <select className="select select-bordered">
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
