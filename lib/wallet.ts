import useAccount from "@/states/useAccount";

export const mina = typeof window !== "undefined" && (window as any)?.mina;

export const MINA_SUB_DECIMAL: number = 1e9;
export const WALLET_CONNECTED_BEFORE_FLAG: string = "wallet_connected_before";

export async function connect() {
  if (!mina) return;
  await requestNetwork();
  await requestAccounts();

  typeof window !== "undefined" &&
    window.localStorage.setItem(WALLET_CONNECTED_BEFORE_FLAG, "true");

  mina.on("accountsChanged", requestAccounts);
  mina.on("chainChanged", requestNetwork);
}

export async function disconnect() {
  useAccount.setState(() => ({
    balances: {},
    hasBeenSetup: false,
    publicKeyBase58: null,
  }));
}

async function requestNetwork() {
  await mina
    .requestNetwork()
    .then(handleChainChanged)
    .catch((e: any) => console.error(e));
}

async function handleChainChanged(newChain: string) {
  useAccount.setState(() => ({ network: newChain }));
}

async function requestAccounts() {
  await mina
    .requestAccounts()
    .then(handleAccountsChanged)
    .catch((e: any) => console.error(e));
}

async function handleAccountsChanged(accounts: string[]) {
  let publicKeyBase58: string = "";

  if (accounts?.length > 0) {
    publicKeyBase58 = accounts[0];
  } else {
    typeof window !== "undefined" &&
      window.localStorage.setItem(WALLET_CONNECTED_BEFORE_FLAG, "false");
  }
  useAccount.setState(() => ({
    publicKeyBase58,
  }));
}
