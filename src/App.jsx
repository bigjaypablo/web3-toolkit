import { WalletManager } from './components/web3/WalletManager';

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Web3 Mini-Toolkit</h1>
        <p className="text-zinc-400 text-xs">Tap below to test the wallet connection modal.</p>
      </div>

      <div className="bg-[#121214] border border-zinc-800/80 p-6 rounded-3xl shadow-xl">
        <WalletManager />
      </div>
    </div>
  );
}
