"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { mina } from "@/lib/wallet";
import { connect } from "@/lib/wallet";

export default function Bridge() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [directFlag, setDirectFlag] = useState(false);
  const handleSwitchDirection = () => {
    setDirectFlag(!directFlag);
  };

  const [connected, setConnected] = useState(1);

  const handleConnectWallet = () => {
    connect()
      .then(() => setConnected(2))
      .catch((err) => console.log(err));
  };

  const handleBridge = () => {
    setConnected(3);
    setTimeout(() => {
      setConnected(4);
    }, 3000);
  };
  const handleClaim = () => {};

  const handleSend = (status: Number) => {
    switch (status) {
      case 1:
        handleConnectWallet();
        break;
      case 2:
        handleBridge();
        break;
      case 3:
        break;
      default:
        handleClaim();
        break;
    }
  };

  return (
    <div>
      <div className="pb-6 flex flex-col items-center">
        <div>
          <div className="w-full flex flex-col gap-2">
            <div className="pt-5">
              <div className="text-md float-right">Balance: 0</div>
              <div className="text-md mb-2">
                From: {directFlag ? "Mina" : "Zeko"}
              </div>
              <div className="flex flex-row gap-5 items-center">
                <Input
                  className="w-full md:w-[40rem]"
                  variant="bordered"
                  label="Amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          color="primary"
          className="w-full md:w-fit mt-5"
          radius="sm"
          onClick={handleSwitchDirection}
        >
          Switch Direction
        </Button>
        <div>
          <div className="w-full flex flex-col gap-2 pt-5">
            <span className="text-md">To: {directFlag ? "Zeko" : "Mina"}</span>
            <Input
              className="w-full md:w-[40rem] mb-5"
              variant="bordered"
              type="email"
              label="Target Address"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
            />
          </div>
        </div>
      </div>
      <Button
        color="primary"
        className="w-full md:w-fit"
        radius="sm"
        onClick={() => {
          handleSend(connected);
        }}
      >
        {connected === 1
          ? "Connect Wallet"
          : connected === 2
          ? "Bridge ➜"
          : connected === 3
          ? "Awaiting Confirmation..."
          : "Claim"}
      </Button>
      <div className="mt-10">
        <div className="text-3xl">Transaction History</div>
        <div className="pt-5">Your transaction will appear here.</div>
        <Button color="primary" className="w-full md:w-fit mt-5" radius="sm">
          CLEAR TRANSACTION HISTORY
        </Button>
      </div>
    </div>
  );
}
