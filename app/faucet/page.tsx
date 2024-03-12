"use client";

import { label, subtitle, title } from "@/components/primitives";
import { NETWORKS } from "@/config/networks";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { clsx } from "clsx";
import { useState } from "react";

export default function DocsPage() {
  const [network, setNetwork] = useState(NETWORKS[0]);

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
      />
    </div>
  );

  return (
    <>
      <h1 className={title()}>Faucet</h1>

      <h2 className={subtitle()}>
        Enter a Mina address to receive testnet MINA (tMINA).
        <br />
        These have no value, monetary or otherwise, and are solely useful for
        experimenting on testnets.
        <br />
        tMINA cannot be sold and is not redeemable for any cryptocurrency or
        digital asset.
      </h2>

      <NetworkSelector />

      <MinaAddressInput />

      <div className="w-full flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-8">
        <Button color="primary" className="w-full md:w-fit" radius="sm">
          REQUEST ➜
        </Button>
        <span className={clsx(label(), "w-full md:w-80")}>
          Limit of 1 use per address on each network to help ensure everyone has
          access.
        </span>
      </div>
    </>
  );
}
