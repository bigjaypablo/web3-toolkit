function WalletOption({
  name,
  description,
  icon,
  onClick,
}) {
  return (
    <button
      className="wallet-option"
      onClick={onClick}
      type="button"
    >
      <div className="wallet-option-left">

        <div className="wallet-icon">
          {icon}
        </div>

        <div className="wallet-info">
          <span className="wallet-name">
            {name}
          </span>

          <span className="wallet-description">
            {description}
          </span>
        </div>

      </div>

      <span className="wallet-arrow">
        →
      </span>
    </button>
  );
}

export default WalletOption;
