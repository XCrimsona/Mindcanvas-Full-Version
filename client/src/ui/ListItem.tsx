import { ReactNode } from "react";

interface ListItemProps {
  className: string;
  children: ReactNode;
}

const ListItem = ({ className, children }: ListItemProps) => {
  return <li className={className}>{children}</li>;
};

export default ListItem;
