import React, { useState } from 'react';
import { ConnectModal } from '../ui/ConnectModal';

export function WalletManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletData, setWalletData] = useState(null);

  // This function handles the real workflow: popup -> user choice -> sign -> connect
  const handleSelectWallet = async (walletType) => {
    setIsConnecting(true);

    try {
      if (walletType === 'injected') {
        // 1. Check if a real web3 browser wallet (like MetaMask or Trust Wallet browser) exists
        if (typeof window !== 'undefined' && window.ethereum) {
          
          // 2. This triggers the real signature / connection prompt popup in the wallet
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });

          // 3. Successfully connected and returned back to the platform
          setWalletData({
            address: accounts[0],
            provider: 'Browser Wallet'
          });
        } else {
          alert("No crypto wallet found! Please open this app inside Trust Wallet or MetaMask browser.");
        }
      } else if (walletType === 'phantom') {
        // Handle Phantom / Solana connection logic here
        // If window.solana is available:
        if (typeof window !== 'undefined' && window.solana) {
          const response = await window.solana.connect();
          setWalletData({
            address: response.publicKey.toString(),
            provider: 'Phantom'
          });
        } else {
          alert("Phantom wallet extension not detected.");
        }
      }

      setIsConnecting(false);
      setIsModalOpen(false); // Close modal on success

    } catch (error) {
      console.error("User rejected connection or error occurred:", error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setWalletData(null);
  };

  return (
    <div className="flex items-center">
      {!walletData ? (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-3 rounded-2xl font-medium transition shadow-lg shadow-indigo-600/25"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-2xl shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-mono text-zinc-200">
            {walletData.address.substring(0, 6)}...{walletData.address.substring(walletData.address.length - 4)}
          </span>
          <button 
            onClick={handleDisconnect}
            className="text-xs text-zinc-400 hover:text-red-400 ml-2 transition font-medium"
          >
            Disconnect
          </button>
        </div>
      )}

      <ConnectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectWallet={handleSelectWallet}
        isConnecting={isConnecting}
      />
    </div>
  );
}

