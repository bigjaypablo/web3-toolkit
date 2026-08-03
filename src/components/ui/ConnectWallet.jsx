import { useState } from "react";
import ConnectModal from "./ConnectModal";
import { connectEvmWallet } from "../web3/evm";

function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  async function handleWalletSelect(wallet) {
    setError(null);

    try {
      setIsConnecting(true);

      let walletAddress;

      if (
        wallet === "metamask" ||
        wallet === "trust"
      ) {
        const walletName =
          wallet === "metamask"
            ? "MetaMask"
            : "Trust Wallet";

        walletAddress =
          await connectEvmWallet(walletName);
      }

      if (walletAddress) {
        setAddress(walletAddress);
        setIsModalOpen(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  }

  function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <>
      {!address ? (
        <button
          type="button"
          className="connect-wallet-button"
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
          disabled={isConnecting}
        >
          {isConnecting
            ? "Connecting..."
            : "Connect Wallet"}
        </button>
      ) : (
        <button
          type="button"
          className="connected-wallet-button"
        >
          {shortenAddress(address)}
        </button>
      )}

      {isModalOpen && (
        <ConnectModal
          onClose={() => setIsModalOpen(false)}
          onWalletSelect={handleWalletSelect}
        />
      )}

      {error && (
        <p className="wallet-error">
          {error}
        </p>
      )}
    </>
  );
}

export default ConnectWallet;
