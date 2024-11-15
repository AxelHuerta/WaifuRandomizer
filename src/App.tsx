import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import Link from "./components/ui/Link";
import { Skeleton } from "./components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tags = [
  "waifu",
  "maid",
  "marin-kitagawa",
  "mori-calliope",
  "raiden-shogun",
  "oppai",
  "selfies",
  "uniform",
  "kamisato-ayaka",
];

const URL = "https://api.waifu.im/search";

function App() {
  const [waifu, setWaifu] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getRandomWaifu = async () => {
    setIsLoading(true);
    await axios.get(URL).then((res) => {
      setWaifu(res.data.images[0]);
    });

    setIsLoading(false);
  };

  const handleSelectTag = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setSelectedTag(target.value);
  };

  const getWaifuByTag = async () => {
    setIsLoading(true);
    console.log(selectedTag);
    await axios.get(`${URL}?included_tags=${selectedTag}`).then((res) => {
      setWaifu(res.data.images[0]);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getRandomWaifu();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[1700px] w-[1700px] h-[90vh] flex flex-col justify-between">
        <CardHeader className="text-4xl font-bold">WaifuRandomizer</CardHeader>
        <CardContent className="grid grid-cols-2 gap-8">
          {/* image */}
          {isLoading ? (
            <Skeleton className="h-[70vh] w-[500px] rounded-xl" />
          ) : (
            <img
              src={waifu?.url}
              alt="Waifu"
              className={`max-h-[70vh] rounded-xl ${
                isLoading ? "animate-pulse" : ""
              }`}
              loading="lazy"
            />
          )}

          <div className="h-[70vh]">
            <h2 className="text-3xl font-bold">ID: {waifu?.image_id}</h2>
            <ul>
              <li>Signature: {waifu?.signature}</li>
              <li>Extension: {waifu?.extension}</li>
              <li>
                Dominant color:{" "}
                <span
                  className={`w-4 h-4 px-3 border-white border-2`}
                  style={{ background: `${waifu?.dominant_color}` }}
                ></span>
                {waifu?.dominant_color}
              </li>
              <li>
                Source: <Link href={waifu?.source} />
              </li>
              <li>Uploaded at: {waifu?.uploaded_at}</li>
              {waifu?.liked_at && <li>Liked at: {waifu?.liked_at}</li>}
              <li>Width: {waifu?.width}</li>
              <li>Height: {waifu?.height}</li>
              <li>Byte size: {waifu?.byte_size}</li>
              <li>Favorites: {waifu?.favorites}</li>
              <li>
                URL: <Link href={waifu?.url} />
              </li>
              <li>
                Preview URL: <Link href={waifu?.preview_url} />
              </li>
            </ul>

            {waifu?.artist != undefined && (
              <>
                <h3 className="text-2xl font-bold my-4">Artist</h3>
                <ul>
                  <li>Artist ID: {waifu.artist.artist_id}</li>
                  <li>Name: {waifu.artist.name}</li>
                  {waifu.artist.pixiv && (
                    <li>
                      Pixiv: <Link href={waifu.artist.pixiv} />
                    </li>
                  )}
                  {waifu.artist.patreon && (
                    <li>
                      Patreon: <Link href={waifu.artist.patreon} />
                    </li>
                  )}
                  {waifu.artist.twitter && (
                    <li>
                      Twitter: <Link href={waifu.artist.twitter} />
                    </li>
                  )}
                  {waifu.artist.deviant_art && (
                    <li>
                      Deviant Art: <Link href={waifu.artist.deviant_art} />
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </CardContent>
        <CardDescription className="mx-5">
          {waifu?.tags.map((tag) => {
            return (
              <Badge
                key={tag.tag_id}
                className="mr-2 rounded-xl"
                variant="outline"
              >
                {tag.name}
              </Badge>
            );
          })}
        </CardDescription>
        <CardFooter className="flex justify-end">
          <div className="flex mx-4">
            <form onChange={handleSelectTag}>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>
            <Button className="rounded-full ml-4" onClick={getWaifuByTag}>
              Por tag
            </Button>
          </div>
          <Button className="rounded-full" onClick={getRandomWaifu}>
            Random
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
