import ConnectWallet from "./components/ui/ConnectWallet";

function App() {
  return (
    <main className="app">
      <div className="app-content">
        <span className="eyebrow">
          WEB3 TOOLKIT
        </span>

        <h1>
          Connect your wallet
        </h1>

        <p>
          Connect your wallet to access Web3 features.
        </p>

        <ConnectWallet />
      </div>
    </main>
  );
}

export default App;
