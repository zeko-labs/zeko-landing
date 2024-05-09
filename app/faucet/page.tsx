"use client";

import { label, subtitle, title } from "@/components/primitives";
import { NETWORKS } from "@/config/networks";
import FaucetApiService from "@/services/faucetApi";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import createSupaClient, {
  addToTable,
  checkAddressInTable,
  getUserCount,
} from "@/utils/client";
import { SupabaseClient } from "@supabase/supabase-js";

const fas = new FaucetApiService();
let supaInstance: SupabaseClient;

export default function DocsPage() {
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [address, setAddress] = useState("");
  const [responseTxt, setResponseTxt] = useState("");
  const [requesting, setRequesting] = useState(false);
  let doesExist: boolean, totalLength: number;

  const handleRequest = async () => {
    if (requesting) return;
    await checkAddress();
    if (doesExist) return;
    await getTotalLength();
    await addAddress(totalLength + 1);
    setRequesting(true);
    const responseTxt = await fas.request(address);
    setResponseTxt(responseTxt);
    setRequesting(false);
  };

  const checkAddress = async () => {
    let data = await checkAddressInTable(supaInstance, address);
    if (data?.length !== undefined && data.length > 0) {
      doesExist = true;
      setResponseTxt("This address has been fauceted");
    } else doesExist = false;
  };

  const getTotalLength = async () => {
    let data = await getUserCount(supaInstance);
    totalLength = data?.length === undefined ? 0 : data.length;
  };

  const addAddress = async (index: Number) => {
    await addToTable(supaInstance, index, address);
  };

  useEffect(() => {
    supaInstance = createSupaClient();
  }, []);

  const NetworkSelector = () => (
    <div className="w-full flex flex-col gap-2">
      <span className={label()}>NETWORK</span>
      <div className="w-full md:w-fit flex flex-col md:flex-row rounded-lg overflow-hidden">
        {NETWORKS.map((n) => (
          <Button
            key={n.chainId}
            className="w-full md:w-fit rounded-none"
            color={network === n ? "primary" : "default"}
            onClick={() => setNetwork(n)}
          >
            {n.name}
          </Button>
        ))}
      </div>
      <span className={label()}>
        To faucet tMINA on Mina L1 please visit{" "}
        <Link href="https://faucet.minaprotocol.com" target="_blank">
          https://faucet.minaprotocol.com
        </Link>
      </span>
    </div>
  );

  const MinaAddressInput = () => (
    <div className="w-full flex flex-col gap-2">
      <span className={label()}>MINA ADDRESS</span>
      <Input
        className="w-full md:w-[40rem]"
        type="email"
        variant="bordered"
        placeholder="B62..."
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
    </div>
  );

  return (
    <>
      <h1 className={title()}>Faucet</h1>

      <div className="flex flex-col gap-2">
        <h2 className={subtitle({ noMargin: true })}>
          Enter a Mina address to receive testnet MINA (tMINA) on Zeko L2.
        </h2>
        <h2 className={subtitle({ noMargin: true })}>
          These have no value, monetary or otherwise, and are solely useful for
          experimenting on testnets.
        </h2>
        <h2 className={subtitle({ noMargin: true })}>
          tMINA cannot be sold and is not redeemable for any cryptocurrency or
          digital asset.
        </h2>
      </div>

      <NetworkSelector />

      <MinaAddressInput />

      <div className="w-full flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-8">
        <Button
          color="primary"
          className="w-full md:w-fit"
          radius="sm"
          isLoading={requesting}
          onClick={handleRequest}
        >
          REQUEST ➜
        </Button>
        <span className={clsx(label(), "w-full md:w-80")}>
          Limit of 1 use per address on each network to help ensure everyone has
          access.
        </span>
      </div>

      <div className={clsx(label(), "w-full")}>
        {responseTxt || <>&nbsp;</>}
      </div>
    </>
  );
}
