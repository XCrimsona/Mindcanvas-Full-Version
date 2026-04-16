import { ReactNode } from "react";

interface ISpan {
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

export const SpanFragment = ({
  id,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ISpan) => {
  return (
    <span
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
