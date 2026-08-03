import WalletOption from "./WalletOption";

function ConnectModal({ onClose, onWalletSelect }) {
  return (
    <div className="modal-overlay">
      <div className="connect-modal">

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="modal-header">
          <h2>Connect Wallet</h2>

          <p>
            Choose a wallet to connect to Web3 Toolkit.
          </p>
        </div>

        <div className="wallet-list">

          <WalletOption
            name="Phantom"
            description="Connect with Solana"
            icon="👻"
            onClick={() => onWalletSelect("Phantom")}
          />

          <WalletOption
            name="MetaMask"
            description="Connect with EVM"
            icon="🦊"
            onClick={() => onWalletSelect("MetaMask")}
          />

          <WalletOption
            name="Trust Wallet"
            description="Connect with EVM"
            icon="💙"
            onClick={() => onWalletSelect("Trust Wallet")}
          />

          <WalletOption
            name="Coinbase Wallet"
            description="Connect with EVM"
            icon="🔵"
            onClick={() => onWalletSelect("Coinbase Wallet")}
          />

        </div>

        <p className="modal-footer">
          By connecting your wallet, you agree to continue.
        </p>

      </div>
    </div>
  );
}

export default ConnectModal;
