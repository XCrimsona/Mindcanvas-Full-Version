import { ReactNode } from "react";

interface NavLinkProps {
  id: string;
  className: string;
  children: ReactNode;
  navigateTo: string;
}
export default NavLinkProps;
