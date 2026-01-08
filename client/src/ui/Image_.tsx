import Div from "./Div";

const Image_ = ({
  className,
  imgClassName,
  src,
  alt,
  width,
  height,
}: {
  className: string | undefined;
  imgClassName: string | undefined;
  src: string | undefined;
  alt: string | undefined;
  width: number;
  height: number;
}) => {
  return (
    <Div className={`${className}`}>
      <Image_
        className={imgClassName}
        width={width}
        height={height}
        src={`${src}`}
        alt={`${alt}`}
        style={{ width: "auto", height: "auto", objectFit: "cover" }}
        priority
        loading="lazy"
      />
    </Div>
  );
};

export default Image_;
