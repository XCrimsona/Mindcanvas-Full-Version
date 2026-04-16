import FooterProps from "./FooterInterface";

const Footer = ({ id, className, children }: FooterProps) => {
  return (
    <footer id={id} className={className}>
      {children}
    </footer>
  );
};

export default Footer;
