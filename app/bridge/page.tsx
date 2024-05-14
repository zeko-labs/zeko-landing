"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Bridge() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [directFlag, setDirectFlag] = useState(false);
  const handleSwitchDirection = () => {
    setDirectFlag(!directFlag);
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
      <div>
        <div className="text-3xl">Transaction History</div>
        <div className="pt-5">Your transaction will appear here.</div>
        <Button color="primary" className="w-full md:w-fit mt-5" radius="sm">
          CLEAR TRANSACTION HISTORY
        </Button>
      </div>
    </div>
  );
}
