import { TwitterIcon, TelegramIcon, PaperIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center md:justify-end gap-4 md:gap-8 p-4 md:p-8">
      <Link isExternal href={siteConfig.links.discord} aria-label="Twitter">
        <span className="font-bold text-4xl">MVP</span>
      </Link>
      <Link isExternal href={siteConfig.links.litepaper} aria-label="Twitter">
        <PaperIcon className="text-default-900" size={40} />
      </Link>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <TwitterIcon className="text-default-900" size={40} />
      </Link>
      <Link isExternal href={siteConfig.links.telegram} aria-label="Github">
        <TelegramIcon className="text-default-900" size={40} />
      </Link>
    </footer>
  );
};
