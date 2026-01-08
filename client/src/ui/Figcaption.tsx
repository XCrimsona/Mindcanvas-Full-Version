import React, { ReactNode } from "react";

const Figcaption = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return <figcaption className={className}>{children}</figcaption>;
};

export default Figcaption;
