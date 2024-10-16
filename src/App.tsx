import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";

const URL = "https://api.waifu.im/search";

function App() {
  const [waifu, setWaifu] = useState<Image | null>(null);

  const getRandomWaifu = async () => {
    await axios.get(URL).then((res) => {
      setWaifu(res.data.images[0]);
    });
  };

  useEffect(() => {
    getRandomWaifu();
  }, []);

  return (
    // TODO: Does these classes make sense?
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[1700px] w-[1700px]">
        <CardHeader>WaifuRandomizer</CardHeader>
        <CardContent className="flex gap-8">
          <img
            src={waifu?.url}
            alt="Waifu"
            className="max-h-[70vh] rounded-xl"
            loading="lazy"
          />
          <div>
            <h2 className="text-3xl font-bold">ID: {waifu?.image_id}</h2>
            <ul>
              <li>Signature: {waifu?.signature}</li>
              <li>Extension: {waifu?.extension}</li>
              <li>Dominant color: {waifu?.dominant_color}</li>
              <li>Source: {waifu?.source}</li>
              <li>Uploaded at: {waifu?.uploaded_at}</li>
              <li>Liked at: {waifu?.liked_at}</li>
              <li>Is NSFW: {waifu?.is_nsfw ? "Yes" : "No"}</li>
              <li>Width: {waifu?.width}</li>
              <li>Height: {waifu?.height}</li>
              <li>Byte size: {waifu?.byte_size}</li>
              <li>Favorites: {waifu?.favorites}</li>
              <li>URL: {waifu?.url}</li>
              <li>Preview URL: {waifu?.preview_url}</li>
            </ul>

            {waifu?.artist && (
              <>
                <h3 className="text-2xl font-bold my-4">Artist</h3>
                <ul>
                  <li>Artist ID: {waifu.artist.artist_id}</li>
                  <li>Name: {waifu.artist.name}</li>
                  <li>Patreon: {waifu.artist.patreon}</li>
                  <li>Pixiv: {waifu.artist.pixiv}</li>
                  <li>Twitter: {waifu.artist.twitter}</li>
                  <li>Deviant Art: {waifu.artist.deviant_art}</li>
                </ul>
              </>
            )}
          </div>
        </CardContent>
        <CardDescription className="mx-5">
          {waifu?.tags.map((tag) => {
            return (
              <Badge key={tag.tag_id} className="mr-2 rounded-xl">
                {tag.name}
              </Badge>
            );
          })}
        </CardDescription>
        <CardFooter>El footer</CardFooter>
      </Card>
    </div>
  );
}

export default App;
