import React, { ReactNode } from "react";

const Figure = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return <figure className={className}>{children}</figure>;
};

export default Figure;
