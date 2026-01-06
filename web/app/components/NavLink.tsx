import { usePathname } from "next/navigation";
import React from "react";
import { _linkResolver } from "../utils-old/utils";
import { LinkExternal, LinkInternal } from "../types/schema";
import Link from "next/link";
import LinkTransition from "./ui/LinkTransition";

type NavLinkProps = {
  // input: LinkInternal | LinkExternal;
  depth: number;
  label: string;
  href: string;
};

const NavLink = ({ href, label, depth }: NavLinkProps) => {
  const pathname = usePathname();

  // const href = _linkResolver(input.link);
  const ariaCurrent = href === pathname ? "page" : undefined;
  return (
    <LinkTransition
      href={href}
      aria-current={ariaCurrent}
      className={`depth-${depth}`}>
      {label}
    </LinkTransition>
  );
};

export default NavLink;
