import type { WaifuApiResponse } from "../interfaces/waifu-API-response";

interface Props {
  data: WaifuApiResponse | null;
}
export default function Code({ data }: Props) {
  return (
    <div className="flex justify-center">
      <div className="mockup-code w-full bg-[#09002f] max-w-2xl">
        <pre className="px-8">
          <code>
            <p>
              <span className="text-pink-400">"signature"</span>:
              <span className="text-green-600">
                {" "}
                {data?.images[0].signature}
              </span>
            </p>
            <p>
              <span className="text-pink-400">"image_id"</span>:
              <span className="text-green-600">
                {" "}
                {data?.images[0].image_id}
              </span>
            </p>
            <div className="flex">
              <span className="text-pink-400">"dominant_color"</span>:{" "}
              <div
                className={`w-4 h-4`}
                style={{
                  backgroundColor: `${
                    data?.images[0].dominant_color
                      ? data?.images[0].dominant_color
                      : ""
                  }`,
                }}
              ></div>
              <span className="text-green-600">
                {" "}
                {data?.images[0].dominant_color}
              </span>
            </div>
            <p>
              <span className="text-pink-400">"artist"</span>:
              <span className="text-green-600">
                {" "}
                {data?.images[0].artist ? data?.images[0].artist.name : "null"}
              </span>
            </p>
            <p>
              <span className="text-pink-400">"source"</span>:
              <span className="text-green-600"> {data?.images[0].source}</span>
            </p>
            <p>
              <span className="text-pink-400">"uploaded_at"</span>:
              <span className="text-green-600">
                {" "}
                {data?.images[0].uploaded_at
                  ? data?.images[0].uploaded_at.toString()
                  : ""}
              </span>
            </p>
            <p>
              <span className="text-pink-400">"width"</span>:
              <span className="text-green-600"> {data?.images[0].width}</span> x
              <span className="text-pink-400"> "height"</span>:
              <span className="text-green-600"> {data?.images[0].height}</span>
            </p>
            <p>
              <span className="text-pink-400">"tags"</span>:
              <span className="text-green-600">
                {" "}
                {data?.images[0].tags.map((tag) => tag.name).join(", ")}
              </span>
            </p>
          </code>
        </pre>
      </div>
    </div>
  );
}
