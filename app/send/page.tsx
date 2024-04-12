"use client";

import { useState, useEffect } from "react";
import { mina } from "@/lib/wallet";
import { connect, WALLET_CONNECTED_BEFORE_FLAG } from "@/lib/wallet";
import { getUsdRate } from "@/app/send/actions";

import { Button } from "@nextui-org/button";
import { Card, Select, SelectItem } from "@nextui-org/react";

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
      <Card>
        <div className="p-4">
          <div className="text-left">You are sending</div>
          <input
            type="text"
            className="w-full text-5xl text-center focus:outline-none"
            value={amount}
            placeholder="0"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div className="text-left text-sm text-gray-500">
            {USDollarFormatter.format(Number(amount) * balance)}
          </div>
        </div>
        <div>
          <Select radius="none">
            <SelectItem key={0} value="mina-protocol">
              MINA
            </SelectItem>
          </Select>
        </div>
      </Card>
      <Card className="p-3 mt-3">
        <div className="text-left">To</div>
        <input
          type="text"
          className="w-full text-sm text-left p-3 focus:outline-none"
          value={recipient}
          placeholder="Type address here"
          onChange={(e) => setRecipient(e.target.value)}
        />
      </Card>
      {!connected ? (
        <Card>
          <Button className="btn-warning w-full" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        </Card>
      ) : (
        <Card>
          <Button className="btn-warning w-full" onClick={handleSend}>
            Send
          </Button>
        </Card>
      )}
    </>
  );
}
