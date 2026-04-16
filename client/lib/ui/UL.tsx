import { ReactNode } from "react";

interface UnoderedListProps {
  className: string;
  children: ReactNode;
}
const UL = ({ className, children }: UnoderedListProps) => {
  return <ul className={className}>{children}</ul>;
};

export default UL;
