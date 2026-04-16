import { ReactNode } from "react";

interface ButtonProps {
  id: string;
  className: string;
  onClick?: React.ReactEventHandler;
  children: ReactNode;
}

const Button = ({ id, className, onClick, children }: ButtonProps) => {
  return (
    <button id={id} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
