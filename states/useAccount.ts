import { create } from "zustand";

interface AccountModel {
  hasBeenSetup: boolean;
  publicKey: null;
  publicKeyBase58: null | string;
  network: null | string;
  balances: { [id: string]: number };
}

interface AccountState extends AccountModel {
  update: (value: Partial<AccountModel>) => void;
}

export const InitialAccountState = {
  hasBeenSetup: false,
  publicKey: null,
  publicKeyBase58: null,
  network: null,
  balances: {},
};

const useAccount = create<AccountState>((set) => ({
  ...InitialAccountState,
  update: (value: Partial<AccountModel>) => {
    set((state) => ({ ...state, ...value }));
  },
}));

export default useAccount;
