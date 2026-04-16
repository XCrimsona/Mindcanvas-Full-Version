import { ReactNode } from "react";

interface HeadingThreeProps {
  id: string;
  className: string;
  children: ReactNode;
}

const HeadingThree = ({ id, className, children }: HeadingThreeProps) => {
  return (
    <h3 id={id} className={className}>
      {children}
    </h3>
  );
};

export default HeadingThree;
