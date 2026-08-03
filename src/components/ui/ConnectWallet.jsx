import { useState } from "react";
import ConnectModal from "./ConnectModal";

function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleWalletSelect(walletName) {
    setConnectedWallet(walletName);
    setIsModalOpen(false);
  }

  function handleDisconnect() {
    setConnectedWallet(null);
  }

  return (
    <>
      {!connectedWallet ? (
        <button
          className="connect-wallet-button"
          onClick={openModal}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="connected-wallet-button"
          onClick={handleDisconnect}
        >
          {connectedWallet} Connected
        </button>
      )}

      {isModalOpen && (
        <ConnectModal
          onClose={closeModal}
          onWalletSelect={handleWalletSelect}
        />
      )}
    </>
  );
}

export default ConnectWallet;
