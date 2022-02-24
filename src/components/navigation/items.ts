import { IconType } from "react-icons";
import { IoHomeOutline, IoLogInOutline, IoPerson, IoPersonAddOutline } from "react-icons/io5";

export interface NavItem {
  label: string;
  Icon?: IconType;
  href: string;
  onlyGuest?: boolean;
  onlyAuth?: boolean;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    Icon: IoHomeOutline,
    href: "/",
  },
  {
    label: "My Account",
    Icon: IoPerson,
    href: "/account",
    onlyAuth: true,
  },
  {
    label: "Login",
    Icon: IoLogInOutline,
    href: "/login",
    onlyGuest: true,
  },
  {
    label: "Register",
    Icon: IoPersonAddOutline,
    href: "/register",
    onlyGuest: true,
  },
];
