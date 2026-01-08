import { ReactNode } from "react";
import { DivClass } from "./Div";

interface IImage {
  id?: string;
  className: string;
  src: string;
  alt: string;
  children: ReactNode;
  onDoubleClick?: React.ReactEventHandler;
  onClick?: React.ReactEventHandler;
  style?: any;
  onChange?: React.ReactEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

export const ImageSpanElement = () => {
  return <div></div>;
};

export const ImageFragment = ({
  id,
  className,
  style,
  src,
  alt,
  children,
}: IImage) => {
  return (
    <DivClass className={className}>
      <img id={id} className={className} style={style} src={src} alt={alt} />
      {children}
    </DivClass>
  );
};
