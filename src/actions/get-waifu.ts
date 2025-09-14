"use server";

import axios from "axios";
import type { WaifuApiResponse } from "../interfaces/waifu-API-response";

export async function getWaifuImage() {
  const response: WaifuApiResponse = await axios
    .get("https://api.waifu.im/search")
    .then((res) => res.data.images[0])
    .catch(() => {
      return null;
    });

  console.log(response);

  return response;
}
