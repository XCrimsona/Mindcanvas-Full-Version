interface SVGProps {
  src: string;
  className: string;
  alt: string;
  onClick?: React.ReactEventHandler;
}
const SVG = ({ src, className, alt, onClick }: SVGProps) => {
  return <img src={src} onClick={onClick} className={className} alt={alt} />;
};

export default SVG;
