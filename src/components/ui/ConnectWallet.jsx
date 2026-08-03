import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  if (isConnected && address) {
    return (
      <button
        type="button"
        className="connected-wallet-button"
        onClick={() => open()}
      >
        {shortenAddress(address)}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="connect-wallet-button"
      onClick={() => open()}
    >
      Connect Wallet
    </button>
  );
}

export default ConnectWallet;
