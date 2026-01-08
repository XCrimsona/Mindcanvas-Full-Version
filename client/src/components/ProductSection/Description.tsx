import { ReactNode } from "react";
import { LongText } from "../../ui/LongText";

interface DescriptionProps {
  className: string;
  children: ReactNode;
}
const Description = ({ className, children }: DescriptionProps) => {
  return <LongText className={className}>{children}</LongText>;
};

export default Description;
