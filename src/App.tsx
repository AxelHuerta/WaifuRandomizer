import { getWaifuImage } from "./actions/get-waifu";
import PhoneMockup from "./components/phone-mockup";
import { useEffect, useState } from "react";
import type { WaifuApiResponse } from "./interfaces/waifu-API-response";

function App() {
  const [info, setInfo] = useState<WaifuApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // const auxImage = "https://cdn.waifu.im/7239.jpg";

  const getRandomImage = async () => {
    setLoading(true);
    const waifuApiResponse = await getWaifuImage();
    // setImage(waifuApiResponse);
    setInfo(waifuApiResponse);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchWaifuImage() {
      setLoading(true);
      const waifuApiResponse = await getWaifuImage();
      setInfo(waifuApiResponse);
      setLoading(false);
    }
    fetchWaifuImage();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen">
      <section id="main" className="py-8 flex justify-around gap-24 mx-24">
        <PhoneMockup imageUrl={info?.images[0].url || null} loading={loading} />
        <div className="w-full flex flex-col justify-between">
          <div className="flex items-center justify-between mt-12">
            <h1 className="text-2xl font-extrabold">Waifu Randomizer</h1>
            <button className="btn btn-soft btn-neutral">Ir a favoritos</button>
          </div>

          <div className="flex justify-center">
            <div className="mockup-code w-full bg-[#09002f] max-w-2xl">
              <pre>
                <code>
                  <p>
                    <span className="text-pink-400">"signature"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].signature}
                    </span>
                  </p>
                  <p>
                    <span className="text-pink-400">"image_id"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].image_id}
                    </span>
                  </p>
                  <div className="flex">
                    <span className="text-pink-400">"dominant_color"</span>:{" "}
                    <div
                      className={`w-4 h-4`}
                      style={{
                        backgroundColor: `${
                          info?.images[0].dominant_color
                            ? info?.images[0].dominant_color
                            : ""
                        }`,
                      }}
                    ></div>
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].dominant_color}
                    </span>
                  </div>
                  <p>
                    <span className="text-pink-400">"artist"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].artist
                        ? info?.images[0].artist.name
                        : "null"}
                    </span>
                  </p>
                  <p>
                    <span className="text-pink-400">"source"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].source}
                    </span>
                  </p>
                  <p>
                    <span className="text-pink-400">"uploaded_at"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].uploaded_at
                        ? info?.images[0].uploaded_at.toString()
                        : ""}
                    </span>
                  </p>
                  <p>
                    <span className="text-pink-400">"width"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].width}
                    </span>{" "}
                    x<span className="text-pink-400"> "height"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].height}
                    </span>
                  </p>
                  <p>
                    <span className="text-pink-400">"tags"</span>:
                    <span className="text-green-600">
                      {" "}
                      {info?.images[0].tags.map((tag) => tag.name).join(", ")}
                    </span>
                  </p>
                </code>
              </pre>
            </div>
          </div>

          <div className="pb-12">
            <button
              className="btn btn-soft btn-primary"
              onClick={getRandomImage}
            >
              Random
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
