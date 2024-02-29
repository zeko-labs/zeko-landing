import { TwitterIcon, GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center gap-4 py-3">
      <span>The future of zk will be built by you</span>
      <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
        <TwitterIcon className="text-default-500" />
      </Link>
      <Link isExternal href={siteConfig.links.github} aria-label="Github">
        <GithubIcon className="text-default-500" />
      </Link>
    </footer>
  );
};
