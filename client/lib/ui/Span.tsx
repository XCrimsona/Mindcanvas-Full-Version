import { ReactNode } from "react";

interface SpanProps {
  className: string;
  children: ReactNode;
}

const Span = ({ className, children }: SpanProps) => {
  return <span className={className}>{children}</span>;
};

export default Span;
