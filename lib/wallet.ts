import useAccount from "@/states/useAccount";
import { Mina, PublicKey } from "o1js";

export const mina = typeof window !== "undefined" && (window as any)?.mina;

export const MINA_SUB_DECIMAL: number = 1e9;
export const WALLET_CONNECTED_BEFORE_FLAG: string = "wallet_connected_before";

export async function connect() {
  if (!mina) return;
  await requestNetwork();
  await requestAccounts();
  // const Berkeley = Mina.Network(
  //   "https://api.minascan.io/node/devnet/v1/graphql"
  // );
  // Mina.setActiveInstance(Berkeley);

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

export async function getAccountBalance() {
  let publicKeyBase58: string = "";
  // await mina
  //   .requestAccounts()
  //   .then((accounts: string[]) => {
  //     // if (accounts?.length > 0) {
  //     //   publicKeyBase58 = accounts[0];
  //     //   const publicKey = PublicKey.fromBase58(publicKeyBase58);
  //     //   const balance = Mina.getBalance(publicKey);
  //     //   return balance;
  //     // }
  //   })
  //   .catch((e: any) => console.error(e));
  return "";
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
