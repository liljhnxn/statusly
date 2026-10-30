import { http, createConfig } from "wagmi";
import { injected } from "@wagmi/core";
import { botchainTestnet } from "./chain";

export const wagmiConfig = createConfig({
  chains: [botchainTestnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
  transports: {
    [botchainTestnet.id]: http("https://rpc.bohr.life"),
  },
  ssr: true,
});
