import { ReactNode } from "react";

interface SectionIdProps {
  id: string;
  className: string;
  children: ReactNode;
}
const SectionId = ({ id, className, children }: SectionIdProps) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default SectionId;
