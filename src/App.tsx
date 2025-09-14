import { getWaifuImage } from "./actions/get-waifu";
import PhoneMockup from "./components/phone-mockup";
import { useEffect, useState } from "react";
import type { WaifuApiResponse } from "./interfaces/waifu-API-response";

function App() {
  const [image, setImage] = useState<WaifuApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const auxImage = "https://cdn.waifu.im/7239.jpg";

  const getRandomImage = async () => {
    setLoading(true);
    const waifuApiResponse = await getWaifuImage();
    setImage(waifuApiResponse);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchWaifuImage() {
      setLoading(true);
      const waifuApiResponse = await getWaifuImage();
      setImage(waifuApiResponse);
      setLoading(false);
    }
    fetchWaifuImage();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen">
      <section id="main" className="py-8 flex justify-around gap-24 mx-24">
        <PhoneMockup imageUrl={image?.url || ""} loading={loading} />
        <div className="w-full flex flex-col justify-between">
          <div className="flex items-center justify-between mt-12">
            <h1 className="text-2xl font-extrabold">Waifu Randomizer</h1>
            <button className="btn btn-soft btn-neutral">Ir a favoritos</button>
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
