import { ReactNode } from "react";

interface ProductSectionButtonProps {
  className: string;
  children: ReactNode;
}

const ProductSectionButton = ({
  className,
  children,
}: ProductSectionButtonProps) => {
  return <button className={className}>{children}</button>;
};

export default ProductSectionButton;
