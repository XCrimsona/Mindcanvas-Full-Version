import { ReactNode } from "react";
import Div from "../../ui/Div";

interface ProductSectionProps {
  className: string;
  children: ReactNode;
}

const ProductSection = ({ className, children }: ProductSectionProps) => {
  return <Div className={className}>{children}</Div>;
};

export default ProductSection;
