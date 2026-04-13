"use client";
import { ReactNode } from "react";

export const DivClass = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};
