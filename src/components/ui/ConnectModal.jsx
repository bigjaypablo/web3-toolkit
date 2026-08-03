import React from 'react';

export function ConnectModal({ isOpen, onClose, onSelectWallet, isConnecting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#121214] border border-zinc-800/80 rounded-3xl w-full max-w-sm p-6 text-white shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 p-2 rounded-full transition"
        >
          ✕
        </button>

        <div className="text-center mt-2 mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3 text-xl font-bold">
            ⚡
          </div>
          <h3 className="text-xl font-bold tracking-tight">Connect Wallet</h3>
          <p className="text-xs text-zinc-400 mt-1">Select a provider to access your account</p>
        </div>

        <div className="space-y-2.5">
          <button 
            onClick={() => onSelectWallet('injected')}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800/60 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold">🦊</div>
              <div>
                <div className="text-sm font-semibold group-hover:text-indigo-400 transition">Browser Wallet</div>
                <div className="text-[11px] text-zinc-500">MetaMask, Trust, etc.</div>
              </div>
            </div>
            <span className="text-xs text-zinc-600 group-hover:text-zinc-400">→</span>
          </button>

          <button 
            onClick={() => onSelectWallet('phantom')}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800/60 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">👻</div>
              <div>
                <div className="text-sm font-semibold group-hover:text-purple-400 transition">Phantom</div>
                <div className="text-[11px] text-zinc-500">Solana & Multi-chain</div>
              </div>
            </div>
            <span className="text-xs text-zinc-600 group-hover:text-zinc-400">→</span>
          </button>
        </div>

        {isConnecting ? (
          <div className="mt-5 text-center text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 py-2.5 rounded-xl animate-pulse">
            Awaiting signature prompt...
          </div>
        ) : (
          <div className="mt-6 text-center text-[11px] text-zinc-500">
            By connecting, you agree to the Terms of Service
          </div>
        )}
      </div>
    </div>
  );
}
