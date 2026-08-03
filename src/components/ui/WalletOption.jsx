function WalletOption({ name, icon, description, onClick }) {
  return (
    <button className="wallet-option" onClick={onClick}>
      <div className="wallet-option-icon">
        {icon}
      </div>

      <div className="wallet-option-info">
        <span className="wallet-option-name">
          {name}
        </span>

        {description && (
          <span className="wallet-option-description">
            {description}
          </span>
        )}
      </div>
    </button>
  );
}

export default WalletOption;
