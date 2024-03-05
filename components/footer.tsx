import { TwitterIcon, TelegramIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-end gap-8 p-8">
      <span className="text-yellow-300 font-bold text-4xl">MVP</span>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <TwitterIcon className="text-default-500" size={40} />
      </Link>
      <Link isExternal href={siteConfig.links.github} aria-label="Github">
        <TelegramIcon className="text-default-500" size={40} />
      </Link>
    </footer>
  );
};
