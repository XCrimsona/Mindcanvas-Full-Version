import { Link } from "react-router-dom";
import NavLinkProps from "./Nav-Link-Interface";

const CustomNavLink = ({
  id,
  className,
  navigateTo,
  children,
}: NavLinkProps) => {
  return (
    <Link id={id} className={className} to={navigateTo}>
      {children}
    </Link>
  );
};

export default CustomNavLink;
