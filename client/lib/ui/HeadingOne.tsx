import { ReactNode } from "react";

interface HeadingOneProps {
  id: string;
  className: string;
  children: ReactNode;
  //
}

const HeadingOne = ({ id, className, children }: HeadingOneProps) => {
  return (
    <h1 id={id} className={className}>
      {children}
    </h1>
  );
};

export default HeadingOne;
