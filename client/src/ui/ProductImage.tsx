import Div from "./Div";

const ProductImage = ({
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
      <Image
        className={imgClassName}
        width={width}
        height={height}
        src={`${src}`}
        alt={`${alt}`}
        style={{ objectFit: "contain" }}
        priority
      />
    </Div>
  );
};

export default ProductImage;
