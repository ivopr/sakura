"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavbar } from "@/contexts/Navbar";
import { cnMerge } from "@/utils/cnMerge";
import { routeIsActive } from "@/utils/route";

type Props = {
  link: NavigationItem;
};

export function NavItem({ link }: Props) {
  const pathname = usePathname();
  const { closeNavbar } = useNavbar();

  return (
    <Link
      href={link.href || "#"}
      className={cnMerge(
        "flex h-10 items-center gap-1.5 font-medium hover:opacity-75",
        {
          "text-primary/75 underline decoration-2 underline-offset-4 decoration-primary":
            routeIsActive(pathname ?? "", link),
        }
      )}
      onClick={closeNavbar}
    >
      {link.Icon ? <link.Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{link.label}</span>
    </Link>
  );
}
