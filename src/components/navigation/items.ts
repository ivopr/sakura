import { EnterIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export interface NavItem {
  label: string;
  Icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  href: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    Icon: HomeIcon,
    href: "/",
  },
  {
    label: "Login",
    Icon: EnterIcon,
    href: "/login",
  },
  {
    label: "Register",
    Icon: PlusIcon,
    href: "/register",
  },
];
