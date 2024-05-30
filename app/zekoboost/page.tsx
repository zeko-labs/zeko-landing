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
    "./splash/4.png",
  ];
  return (
    <div className="flex flex-col items-center gap-8 w-full mb-20">
      <button onClick={() => setSubPage(0)}>
        <Image
          src={"./splash/ZekoBoost.png"}
          alt="Boost Image"
          width={400}
          height={200}
          className="lg:w-96 sm:w-60"
        />
      </button>
      <div className="text-center">
        <div className={`${title()} w-full`}>Developer Contest Details</div>
      </div>
      <div className="flex flex-col gap-10 w-full items-center">
        <div className="flex flex-row flex-wrap justify-center gap-5">
          <Button
            radius="md"
            className={`lg:lg:p-7 sm:p-5 sm:p-5 ${
              subpage === 1 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-xl text-white`}
            onClick={() => setSubPage(1)}
          >
            Prizes
          </Button>
          <Button
            radius="md"
            className={`lg:p-7 sm:p-5 ${
              subpage === 2 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-xl text-white`}
            onClick={() => setSubPage(2)}
          >
            Judges
          </Button>
          <Button
            radius="md"
            className={`lg:p-7 sm:p-5 ${
              subpage === 3 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-xl text-white`}
            onClick={() => setSubPage(3)}
          >
            Scoring
          </Button>
          <Button
            radius="md"
            className={`lg:p-7 sm:p-5 ${
              subpage === 4 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-xl text-white`}
            onClick={() => setSubPage(4)}
          >
            Entry
          </Button>
          <Button
            radius="md"
            className={`lg:p-7 sm:p-5 ${
              subpage === 5 ? "bg-[#4873ff]" : "bg-[#7494ff]"
            } text-xl text-white`}
            onClick={() => setSubPage(5)}
          >
            Resources
          </Button>
        </div>
        <div>
          {subpage < 4 ? (
            <div className="flex flex-col gap-5">
              <Image
                src={subPageUrl[subpage]}
                width={700}
                height={700}
                alt="Page"
              />
              {subpage === 1 ? (
                <Image
                  src={"./splash/2-1.png"}
                  width={700}
                  height={700}
                  alt="Page"
                />
              ) : (
                <></>
              )}
            </div>
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
              <div className="flex flex-col gap-7 items-center">
                <div className="text-black text-2xl">Zeko Logo</div>
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
              </div>
              <div className="flex flex-col gap-7 items-center">
                <div className="text-black text-2xl">Partnership Mashups</div>
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
              </div>
              <div className="flex flex-col gap-5 items-center">
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
            </div>
          )}
        </div>
      </div>
      <div>
        <Link href="https://discord.gg/vSDxqAchUY">
          <Button
            radius="full"
            className="bg-gradient-to-r from-[#F2BB3E] to-[#FFE359] text-black p-9 text-lg w-full"
          >
            <div className="break-words">
              Join Discord for <br />
              the Latest Updates
            </div>
            <Image
              src={"./splash/discord.png"}
              alt="Discord Image"
              width={50}
              height={50}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
