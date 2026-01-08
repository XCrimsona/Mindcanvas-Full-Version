import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className: string;
  ariaLabelledBy: string;
}
const Section = ({ id, className, ariaLabelledBy, children }: SectionProps) => {
  return (
    <section id={id} className={className} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  );
};

export default Section;
