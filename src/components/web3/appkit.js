import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, polygon, arbitrum, base } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_PROJECT_ID;

const networks = [
  mainnet,
  polygon,
  arbitrum,
  base,
];

const metadata = {
  name: "Web3 Toolkit",
  description: "Reusable Web3 wallet connection toolkit",
  url: "https://bigjaypablo.github.io/web3-toolkit/",
  icons: [
    "https://bigjaypablo.github.io/web3-toolkit/favicon.ico",
  ],
};

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
