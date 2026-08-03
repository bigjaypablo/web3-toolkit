export async function connectEvmWallet(wallet) {
  if (!window.ethereum) {
    throw new Error(
      `No crypto wallet found. Please open this website inside ${wallet} or install a compatible wallet.`
    );
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet account was returned.");
  }

  return accounts[0];
}
