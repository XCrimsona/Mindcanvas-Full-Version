import { ReactNode } from "react";

interface ProductSectionProps {
  className: string;
  children: ReactNode;
}

const ProductSection = ({ className, children }: ProductSectionProps) => {
  return <div className={className}>{children}</div>;
};

export default ProductSection;
