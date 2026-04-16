import { ReactNode } from "react";

interface headingTwoProps {
  id: string;
  className: string;
  children: ReactNode;
}

const HeadingTwo = ({ id, className, children }: headingTwoProps) => {
  return (
    <h2 id={id} className={className}>
      {children}
    </h2>
  );
};

export default HeadingTwo;
