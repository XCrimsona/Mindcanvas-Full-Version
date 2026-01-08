import { Link } from "react-router-dom";
import { ReactNode } from "react";

const Contact = ({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export default Contact;
