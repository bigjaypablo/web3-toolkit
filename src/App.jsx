import ConnectWallet from "./components/ui/ConnectWallet";

function App() {
  return (
    <main className="app">
      <div className="app-content">

        <span className="eyebrow">
          WEB3 TOOLKIT
        </span>

        <h1>
          My Web3 Component Library
        </h1>

        <p>
          Reusable React components for Web3 applications.
        </p>

        <ConnectWallet />

      </div>
    </main>
  );
}

export default App;
