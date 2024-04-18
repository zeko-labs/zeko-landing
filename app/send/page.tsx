"use client";

import { useState, useEffect } from "react";
import { mina } from "@/lib/wallet";
import { connect, WALLET_CONNECTED_BEFORE_FLAG } from "@/lib/wallet";
import { getUsdRate } from "@/app/send/actions";

import { Button } from "@nextui-org/button";
import { Card, Select, SelectItem } from "@nextui-org/react";
import { subtitle, title } from "@/components/primitives";
import { Input } from "@nextui-org/input";

const tokenName = "mina-protocol";

export default function SendPage() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(1);

  const handleConnectWallet = () => {
    connect()
      .then(() => setConnected(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsdRate(tokenName)
      .then((val) => {
        setBalance(val.data[tokenName].usd);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSend = async () => {
    try {
      mina
        ?.sendPayment({
          amount: amount,
          to: recipient,
          fee: "",
          memo: "",
        })
        .catch((err: any) => err);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className={title()}>Send</h1>

      <div className="flex flex-col gap-2 text-left">
        <h2 className={subtitle({ noMargin: true })}>
          Provide a specific amount and the recipient Mina address to transfer
          testnet Mina on Zeko
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
      <div>
        <div className="p-4 pl-0">
          <Select variant="bordered" size="lg" className="md:w-[40rem]">
            <SelectItem key={0} value="mina-protocol">
              MINA
            </SelectItem>
          </Select>
        </div>
        <div className="p-4 pl-0 pb-0">
          <div className="text-left mb-5">You are sending</div>
          <div className="flex flex-row gap-5 items-center">
            <Input
              className="w-full md:w-[33rem]"
              variant="bordered"
              placeholder="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <div className="text-2xl">tMINA</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-left mb-5">To</div>
        <Input
          className="w-full md:w-[40rem]"
          variant="bordered"
          type="email"
          placeholder="B62..."
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        />

        {connected ? (
          <Button
            color="primary"
            className="w-full mt-3"
            radius="sm"
            onClick={handleSend}
          >
            SEND ➜
          </Button>
        ) : (
          <Button
            color="primary"
            className="w-full mt-3"
            radius="sm"
            onClick={handleConnectWallet}
          >
            Connect Wallet ➜
          </Button>
        )}
      </div>
    </>
  );
}
