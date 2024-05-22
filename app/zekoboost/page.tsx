"use client";

import { useState } from "react";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

export default function BoostPage() {
  const [subpage, setSubPage] = useState(0);
  const subPageUrl = [
    "./splash/1.png",
    "./splash/2.jpg",
    "./splash/3.png",
    "./splash/4.jpg",
  ];
  return (
    <div className="flex flex-col items-center gap-8 w-full mb-20">
      <div>
        <Image
          src={"./splash/ZekoBoost.png"}
          alt="Boost Image"
          width={400}
          height={200}
        />
      </div>
      <div>
        <h1 className={`${title()} w-full`}>Developer Contest Details</h1>
      </div>
      <div>
        <Link href="https://discord.gg/vSDxqAchUY">
          <Button
            radius="full"
            className="bg-gradient-to-r from-[#F2BB3E] to-[#FFE359] text-white p-10 text-5xl w-full"
          >
            Join Discord to Earn Prizes --&gt;
            <Image
              src={"./splash/discord.png"}
              alt="Discord Image"
              width={50}
              height={50}
            />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-20 w-full items-center">
        <div className="flex flex-row justify-between w-full">
          <Button
            radius="md"
            className={`p-10 ${
              subpage === 1 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-2xl text-white`}
            onClick={() => setSubPage(1)}
          >
            Prizes
          </Button>
          <Button
            radius="md"
            className={`p-10 ${
              subpage === 2 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-2xl text-white`}
            onClick={() => setSubPage(2)}
          >
            Judges
          </Button>
          <Button
            radius="md"
            className={`p-10 ${
              subpage === 3 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-2xl text-white`}
            onClick={() => setSubPage(3)}
          >
            Scoring
          </Button>
          <Button
            radius="md"
            className={`p-10 ${
              subpage === 4 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-2xl text-white`}
            onClick={() => setSubPage(4)}
          >
            Entry
          </Button>
          <Button
            radius="md"
            className={`p-10 ${
              subpage === 5 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-2xl text-white`}
            onClick={() => setSubPage(5)}
          >
            Resources
          </Button>
        </div>
        <div>
          {subpage < 4 ? (
            <Image
              src={subPageUrl[subpage]}
              width={700}
              height={700}
              alt="Page"
            />
          ) : subpage === 4 ? (
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSedPNSBQD_5SSS2ZcT0nk_woS5TCk1H4zd59G4EiGTrlM1ibA/viewform?embedded=true"
              width="640"
              height="1922"
            >
              Loading…
            </iframe>
          ) : (
            <div className="flex flex-col gap-10 items-center w-full">
              <div className="flex justify-between gap-20">
                <a href="/downloads/Zeko-Logo-Dark.png" download>
                  <Image
                    src="/downloads/Zeko-Logo-Dark.png"
                    alt="zeko-logo-dark"
                    width={200}
                    height={200}
                  />
                </a>
                <a href="/downloads/Zeko-Logo-Light.png" download>
                  <Image
                    src="/downloads/Zeko-Logo-Light.png"
                    alt="zeko-logo-light"
                    width={200}
                    height={200}
                  />
                </a>
              </div>
              <div className="flex justify-between gap-20">
                <a href="/downloads/gray.png" download>
                  <Image
                    src="/downloads/gray.png"
                    alt="zeko-gray"
                    width={200}
                    height={200}
                  />
                </a>
                <a href="/downloads/gray.YPL.png" download>
                  <Image
                    src="/downloads/gray.YPL.png"
                    alt="zeko-gray-dark"
                    width={200}
                    height={200}
                  />
                </a>
              </div>
              <div className="flex justify-between gap-20">
                <a href="/downloads/black.png" download>
                  <Image
                    src="/downloads/black.png"
                    alt="zeko-black"
                    width={200}
                    height={200}
                  />
                </a>
                <a href="/downloads/black.YPL.png" download>
                  <Image
                    src="/downloads/black.YPL.png"
                    alt="zeko-black-dark"
                    width={200}
                    height={200}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
