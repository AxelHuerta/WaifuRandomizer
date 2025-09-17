"use server";

import axios from "axios";
import type { WaifuApiResponse } from "../interfaces/waifu-API-response";

export async function getWaifuImage() {
  const response: WaifuApiResponse | null = await axios
    .get<WaifuApiResponse>("https://api.waifu.im/search")
    .then((res) => res.data)
    .catch(() => {
      return null;
    });

  console.log(response);

  return response;
}
