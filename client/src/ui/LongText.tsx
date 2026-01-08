import { ReactNode } from "react";

interface IText {
  id?: string;
  className: string;
  children: ReactNode;
  onDoubleClick?: React.ReactEventHandler;
  onClick?: React.ReactEventHandler;
  style?: any;
  onChange?: React.ReactEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}
export const LongText = ({
  id,
  className,
  children,
  onDoubleClick,
  style,
}: IText) => {
  return (
    <p
      id={id}
      className={className}
      style={style}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </p>
  );
};
export const TextFragment = ({ id, className, children, style }: IText) => {
  return (
    <p id={id} className={className} style={style}>
      {children}
    </p>
  );
};
