import WalletOption from "./WalletOption";

function ConnectModal({
  onClose,
  onWalletSelect,
}) {
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
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Close wallet modal"
        >
          ×
        </button>

        <div className="modal-header">

          <div className="modal-icon">
            🔗
          </div>

          <h2>
            Connect Wallet
          </h2>

          <p>
            Connect your wallet to access the app.
          </p>

        </div>

        <div className="wallet-list">

          <WalletOption
            name="Phantom"
            description="Solana"
            icon="👻"
            onClick={() =>
              onWalletSelect("Phantom")
            }
          />

          <WalletOption
            name="MetaMask"
            description="Ethereum & EVM"
            icon="🦊"
            onClick={() =>
              onWalletSelect("MetaMask")
            }
          />

          <WalletOption
            name="Trust Wallet"
            description="Ethereum & EVM"
            icon="💙"
            onClick={() =>
              onWalletSelect("Trust Wallet")
            }
          />

          <WalletOption
            name="Coinbase Wallet"
            description="Ethereum & EVM"
            icon="🔵"
            onClick={() =>
              onWalletSelect("Coinbase Wallet")
            }
          />

        </div>

        <div className="modal-footer">
          <span>
            🔒
          </span>

          <p>
            Your wallet stays secure. We never have
            access to your private keys.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ConnectModal;
