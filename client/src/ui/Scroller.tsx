import { ReactNode } from "react";
const Scroller = ({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

export default Scroller;
