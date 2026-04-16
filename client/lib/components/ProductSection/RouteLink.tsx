import { ReactNode } from "react";
import { Link } from "react-router-dom";

const RouteLink = ({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
};

export default RouteLink;
