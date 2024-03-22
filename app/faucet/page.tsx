"use client";

import { label, subtitle, title } from "@/components/primitives";
import { NETWORKS } from "@/config/networks";
import FaucetApiService from "@/services/faucetApi";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { clsx } from "clsx";
import { useState } from "react";

const fas = new FaucetApiService();

export default function DocsPage() {
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [address, setAddress] = useState("");
  const [responseTxt, setResponseTxt] = useState("");

  const handleRequest = async () => {
    const responseTxt = await fas.request(address);
    setResponseTxt(responseTxt);
  };

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
          onClick={handleRequest}
        >
          REQUEST ➜
        </Button>
        <span className={clsx(label(), "w-full md:w-80")}>
          Limit of 1 use per address on each network to help ensure everyone has
          access.
        </span>
      </div>

      <span className={clsx(label(), "w-full")}>
        {responseTxt || <>&nbsp;</>}
      </span>
    </>
  );
}
