import { http, createConfig } from "wagmi";
import { injected } from "@wagmi/core";
import { botchain } from "./chain";

export const wagmiConfig = createConfig({
  chains: [botchain],
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
  transports: {
    [botchain.id]: http("https://rpc.botchain.ai"),
  },
  ssr: true,
});
