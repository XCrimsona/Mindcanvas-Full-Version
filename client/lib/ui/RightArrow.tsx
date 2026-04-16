import { DivClass } from "./Div";

const RightArrow = ({
  className,
  classNameDiv,
  src,
  alt,
  width,
  height,
}: {
  className: string;
  classNameDiv: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return (
    <DivClass className={classNameDiv}>
      <picture>
        <img
          className={className}
          width={width}
          height={height}
          sizes="small"
          src={`${src}`}
          alt={alt}
        />
      </picture>
    </DivClass>
  );
};

export default RightArrow;
