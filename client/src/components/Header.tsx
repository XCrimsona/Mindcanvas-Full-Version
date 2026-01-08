import HeaderProps from "../../src/components/HeaderInterface";

const Header = ({ id, className, children }: HeaderProps) => {
  return (
    <header id={id} className={className}>
      {children}
    </header>
  );
};

export default Header;
