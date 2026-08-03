import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";

export function WalletManager() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    open();
  };

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <span className="wallet-status-dot"></span>

        <span className="wallet-address">
          {address.slice(0, 6)}...
          {address.slice(-4)}
        </span>

        <button
          onClick={() => disconnect()}
          className="disconnect-button"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="connect-wallet-button"
    >
      Connect Wallet
    </button>
  );
}
