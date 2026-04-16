import { Link } from "react-router-dom";

interface ILink {
  id: string;
  className: string;
  href: string;
  text: string;
  style?: any;
}
export const TextLinkFragment = ({
  id,
  className,
  href,
  text,
  style,
}: ILink) => {
  return (
    <>
      <Link
        id={id}
        target="_blank"
        to={href}
        className={className}
        style={style}
      >
        {text}
      </Link>
    </>
  );
};
