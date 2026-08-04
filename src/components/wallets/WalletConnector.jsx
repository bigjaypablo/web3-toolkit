import { useEffect, useState } from "react";
import WalletModal from "./WalletModal";

function WalletConnector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");

  // --------------------------------------------------
  // Detect if the page is currently running inside
  // a mobile wallet's in-app browser
  // --------------------------------------------------
  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // --------------------------------------------------
  // Shorten wallet address for display
  // --------------------------------------------------
  const shortenAddress = (address) => {
    if (!address) return "";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // --------------------------------------------------
  // Save successful connection
  // --------------------------------------------------
  const handleSuccessfulConnection = (walletName, address) => {
    console.log(`${walletName} connected:`, address);

    setConnectedWallet(walletName);
    setConnectedAddress(address);
    setIsConnecting(false);
    setIsModalOpen(false);
    setError("");
  };

  // --------------------------------------------------
  // EVM connection
  // --------------------------------------------------
  const connectEVM = async (walletName) => {
    if (!window.ethereum) {
      throw new Error(
        `${walletName} was not detected. Please open this website inside ${walletName}.`
      );
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No wallet account was returned.");
    }

    handleSuccessfulConnection(walletName, accounts[0]);
  };

  // --------------------------------------------------
  // Trust Wallet
  // --------------------------------------------------
  const connectTrustWallet = async () => {
    // Already inside Trust Wallet or another injected EVM wallet
    if (window.ethereum) {
      await connectEVM("Trust Wallet");
      return;
    }

    // Mobile browser → open Trust Wallet
    if (isMobileDevice()) {
      const currentUrl = window.location.href;

      const trustWalletUrl =
        `https://link.trustwallet.com/open_url?url=${encodeURIComponent(
          currentUrl
        )}`;

      console.log("Opening Trust Wallet:", trustWalletUrl);

      window.location.href = trustWalletUrl;

      return;
    }

    throw new Error(
      "Trust Wallet was not detected. Please install the Trust Wallet browser extension or open this website inside Trust Wallet."
    );
  };

  // --------------------------------------------------
  // MetaMask
  // --------------------------------------------------
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      if (isMobileDevice()) {
        throw new Error(
          "Please open this website inside the MetaMask mobile app."
        );
      }

      throw new Error(
        "MetaMask was not detected. Please install the MetaMask browser extension."
      );
    }

    await connectEVM("MetaMask");
  };

  // --------------------------------------------------
  // Coinbase Wallet
  // --------------------------------------------------
  const connectCoinbaseWallet = async () => {
    if (!window.ethereum) {
      if (isMobileDevice()) {
        throw new Error(
          "Please open this website inside the Coinbase Wallet app."
        );
      }

      throw new Error(
        "Coinbase Wallet was not detected."
      );
    }

    await connectEVM("Coinbase Wallet");
  };

  // --------------------------------------------------
  // Phantom
  // --------------------------------------------------
  const connectPhantom = async () => {
    // Phantom browser extension / in-app browser
    if (window.phantom?.solana) {
      const response = await window.phantom.solana.connect();

      handleSuccessfulConnection(
        "Phantom",
        response.publicKey.toString()
      );

      return;
    }

    // Mobile browser → Phantom deep link
    if (isMobileDevice()) {
      const currentUrl = encodeURIComponent(window.location.href);

      const phantomUrl =
        `https://phantom.app/ul/browse/${currentUrl}`;

      console.log("Opening Phantom:", phantomUrl);

      window.location.href = phantomUrl;

      return;
    }

    throw new Error(
      "Phantom was not detected. Please install the Phantom extension."
    );
  };

  // --------------------------------------------------
  // Solflare
  // --------------------------------------------------
  const connectSolflare = async () => {
    if (window.solflare) {
      await window.solflare.connect();

      const address =
        window.solflare.publicKey?.toString();

      if (!address) {
        throw new Error(
          "Solflare connected but no wallet address was returned."
        );
      }

      handleSuccessfulConnection(
        "Solflare",
        address
      );

      return;
    }

    if (isMobileDevice()) {
      throw new Error(
        "Solflare mobile connection flow will be added next."
      );
    }

    throw new Error(
      "Solflare was not detected."
    );
  };

  // --------------------------------------------------
  // Backpack
  // --------------------------------------------------
  const connectBackpack = async () => {
    if (window.backpack) {
      await window.backpack.connect();

      const address =
        window.backpack.publicKey?.toString();

      if (!address) {
        throw new Error(
          "Backpack connected but no wallet address was returned."
        );
      }

      handleSuccessfulConnection(
        "Backpack",
        address
      );

      return;
    }

    if (isMobileDevice()) {
      throw new Error(
        "Backpack mobile connection flow will be added next."
      );
    }

    throw new Error(
      "Backpack was not detected."
    );
  };

  // --------------------------------------------------
  // Wallet selector
  // --------------------------------------------------
  const handleSelectWallet = async (wallet) => {
    setError("");
    setIsConnecting(true);

    try {
      switch (wallet.id) {
        case "metamask":
          await connectMetaMask();
          break;

        case "trust":
          await connectTrustWallet();
          break;

        case "coinbase":
          await connectCoinbaseWallet();
          break;

        case "phantom":
          await connectPhantom();
          break;

        case "solflare":
          await connectSolflare();
          break;

        case "backpack":
          await connectBackpack();
          break;

        default:
          throw new Error(
            "This wallet is not supported yet."
          );
      }
    } catch (connectionError) {
      console.error(
        "Wallet connection error:",
        connectionError
      );

      setError(
        connectionError?.message ||
          "Unable to connect wallet. Please try again."
      );

      setIsConnecting(false);
    }
  };

  // --------------------------------------------------
  // Disconnect
  // --------------------------------------------------
  const handleDisconnect = () => {
    setConnectedWallet(null);
    setConnectedAddress("");
  };

  // --------------------------------------------------
  // Listen for account changes
  // --------------------------------------------------
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        handleDisconnect();
        return;
      }

      setConnectedAddress(accounts[0]);
    };

    window.ethereum.on(
      "accountsChanged",
      handleAccountsChanged
    );

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, []);

  return (
    <>
      {!connectedWallet ? (
        <button
          type="button"
          onClick={() => {
            setError("");
            setIsModalOpen(true);
          }}
          className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-95"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

          <div className="flex flex-col">
            <span className="text-xs text-zinc-500">
              {connectedWallet}
            </span>

            <span className="font-mono text-sm text-white">
              {shortenAddress(connectedAddress)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDisconnect}
            className="ml-2 text-xs text-zinc-500 transition hover:text-red-400"
          >
            Disconnect
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 max-w-sm rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      {isConnecting && (
        <div className="mt-4 text-center text-sm text-zinc-500">
          Connecting wallet...
        </div>
      )}

      <WalletModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isConnecting) {
            setIsModalOpen(false);
          }
        }}
        onSelectWallet={handleSelectWallet}
      />
    </>
  );
}

export default WalletConnector;
