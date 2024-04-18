"use client";

import { useState, useEffect } from "react";
import { mina } from "@/lib/wallet";
import { connect, WALLET_CONNECTED_BEFORE_FLAG } from "@/lib/wallet";
import { getUsdRate } from "@/app/send/actions";

import { Button } from "@nextui-org/button";
import { Card, Select, SelectItem } from "@nextui-org/react";
import { subtitle, title } from "@/components/primitives";
import { Input } from "@nextui-org/input";

const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
    if (
      typeof window !== undefined &&
      window.localStorage.getItem(WALLET_CONNECTED_BEFORE_FLAG)
    ) {
      setConnected(true);
    }
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
          MINA.
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
      <Card>
        <div className="m-4">
          <Select>
            <SelectItem key={0} value="mina-protocol">
              MINA
            </SelectItem>
          </Select>
        </div>
        <div className="p-4">
          <div className="text-left mb-5">You are sending</div>
          <Input
            className="w-full md:w-[40rem]"
            placeholder="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <div className="text-left text-sm text-gray-500 mt-3">
            {USDollarFormatter.format(Number(amount) * balance)}
          </div>
        </div>
      </Card>
      <Card className="p-5">
        <div className="text-left mb-5">To</div>
        <Input
          className="w-full md:w-[40rem]"
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
      </Card>
    </>
  );
}
