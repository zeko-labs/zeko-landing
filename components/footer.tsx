"use client";

import {
  TwitterIcon,
  TelegramIcon,
  PaperIcon,
  GithubIcon,
} from "@/components/icons";
import { useState, useCallback, useEffect } from "react";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Link } from "@nextui-org/link";
import { fontLexendBold } from "@/config/fonts";

export const Footer = () => {
  const [isContentOver, setIsContentOver] = useState(false);
  const checkContentOver = useCallback(() => {
    setIsContentOver(
      document.documentElement.scrollHeight >
        document.documentElement.clientHeight &&
        window.scrollY + window.innerHeight <
          document.documentElement.scrollHeight
    );
  }, []);

  useEffect(() => {
    checkContentOver();
    window.addEventListener("resize", checkContentOver, { passive: true });
    window.addEventListener("scroll", checkContentOver, { passive: true });
    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("scroll", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer
      className={`w-full flex items-center justify-center md:justify-end gap-4 md:gap-8 p-4 md:p-8 fixed bottom-0 ${clsx(
        "bg-opacity-100 backdrop-blur-sm",
        {
          "bg-transparent": isContentOver === false,
          "bg-white": isContentOver === true,
        }
      )}`}
    >
      <Link isExternal href={siteConfig.links.discord} aria-label="MVP">
        <span className={`font-black text-3xl ${fontLexendBold.className}`}>
          MVP
        </span>
      </Link>
      <Link isExternal href={siteConfig.links.github} aria-label="Docs">
        <GithubIcon className="text-default-900" size={28} />
      </Link>
      <Link
        isExternal
        href={siteConfig.links.litepaper}
        aria-label="WhitePaper"
      >
        <PaperIcon className="text-default-900" size={28} />
      </Link>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <TwitterIcon className="text-default-900" size={28} />
      </Link>
      <Link isExternal href={siteConfig.links.telegram} aria-label="Telegram">
        <TelegramIcon className="text-default-900" size={28} />
      </Link>
    </footer>
  );
};
