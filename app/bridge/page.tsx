"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { connect, getAccountBalance } from "@/lib/wallet";
import { title } from "@/components/primitives";

export default function Bridge() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [directFlag, setDirectFlag] = useState(false);
  const [balance, setBalance] = useState("");

  const handleSwitchDirection = () => {
    setDirectFlag(!directFlag);
  };

  const [connected, setConnected] = useState(1);

  const handleConnectWallet = () => {
    connect()
      .then(() => {
        setConnected(2);
        // getAccountBalance().then((res) => setBalance(res));
      })
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
      <h1 className={title()}>Zeko Bridge</h1>
      <div className="pb-6 flex flex-col items-center mt-10">
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
        isLoading={connected === 3}
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
        {connected === 3 ? (
          <div className="pt-5">
            Bridge transactions may take a few minutes to process and Claim.
          </div>
        ) : (
          ""
        )}
        <Button color="primary" className="w-full md:w-fit mt-5" radius="sm">
          CLEAR TRANSACTION HISTORY
        </Button>
      </div>
    </div>
  );
}
