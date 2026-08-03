import React, { useState } from 'react';
import { ConnectModal } from '../ui/ConnectModal';

export function WalletManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletData, setWalletData] = useState(null);

  const handleSelectWallet = async (walletType) => {
    setIsConnecting(true);

    try {
      if (walletType === 'injected') {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          setWalletData({
            address: accounts[0],
            provider: 'Browser Wallet'
          });
        } else {
          alert("No crypto wallet found! Please open this app inside Trust Wallet or MetaMask browser.");
        }
      } else if (walletType === 'phantom') {
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
      setIsModalOpen(false);
    } catch (error) {
      console.error("User rejected connection:", error);
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
