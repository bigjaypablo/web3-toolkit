import WalletOption from "./WalletOption";

function ConnectModal({ onClose, onWalletSelect }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="connect-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-header">
          <h2>Connect Wallet</h2>

          <p>
            Select a wallet to connect to Web3 Toolkit.
          </p>
        </div>

        <div className="wallet-list">
          <WalletOption
            name="Phantom"
            description="Solana"
            icon="👻"
            onClick={() => onWalletSelect("phantom")}
          />

          <WalletOption
            name="MetaMask"
            description="Ethereum & EVM"
            icon="🦊"
            onClick={() => onWalletSelect("metamask")}
          />

          <WalletOption
            name="Trust Wallet"
            description="Ethereum & EVM"
            icon="💙"
            onClick={() => onWalletSelect("trust")}
          />

          <WalletOption
            name="Coinbase Wallet"
            description="Ethereum & EVM"
            icon="🔵"
            onClick={() => onWalletSelect("coinbase")}
          />
        </div>

        <div className="modal-security">
          🔒 Your wallet remains under your control.
        </div>
      </div>
    </div>
  );
}

export default ConnectModal;
