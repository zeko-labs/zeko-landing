import { TwitterIcon, TelegramIcon, PaperIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center md:justify-end gap-4 md:gap-8 p-4 md:p-8">
      <span className="text-yellow-700 font-bold text-4xl">MVP</span>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <PaperIcon className="text-default-900" size={40} />
      </Link>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <TwitterIcon className="text-default-900" size={40} />
      </Link>
      <Link isExternal href={siteConfig.links.github} aria-label="Github">
        <TelegramIcon className="text-default-900" size={40} />
      </Link>
    </footer>
  );
};
