import { ReactNode } from "react";

interface ShortTextProps {
  className: string;
  children: ReactNode;
}
const ShortText = ({ className, children }: ShortTextProps) => {
  return <p className={className}>{children}</p>;
};

export default ShortText;
