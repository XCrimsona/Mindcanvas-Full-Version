import { ReactNode } from "react";

//works with mouse events
export const DivMouse = ({
  className,
  children,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onStyle,
  ref,
}: // onClick,
{
  className: string;
  onMouseDown?: React.ReactEventHandler;
  onMouseMove?: React.ReactEventHandler;
  onMouseUp?: React.ReactEventHandler;
  children: ReactNode;
  onStyle?: any;
  ref: any;
  // onClick?: React.ReactEventHandler;
}) => {
  return (
    <div
      ref={ref}
      style={onStyle}
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

export const DivRef = ({
  ref,
  onStyle,
  className,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  children,
}: {
  ref: any;
  onStyle?: any;
  className: string;
  onMouseDown?: React.ReactEventHandler;
  onMouseMove?: React.ReactEventHandler;
  onMouseUp?: React.ReactEventHandler;
  children: ReactNode;
}) => {
  return (
    <div
      ref={ref}
      style={onStyle}
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

//Div supplies id property for mapping
export const DivId = ({
  id,
  className,
  children,
}: // onClick,
{
  id: string;
  className: string;
  children: ReactNode;
}) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};

//Div supplies id property for mapping
export const DivClass = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

export const DivStylingAndClassName = ({
  className,
  children,
  styles,
}: {
  className: string;
  children: ReactNode;
  styles: string | any;
}) => {
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export const INote = ({
  className,
  children,
  styles,
}: {
  className: string;
  children: ReactNode;
  styles: string | any;
}) => {
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};
