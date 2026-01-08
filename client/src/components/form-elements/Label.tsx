const Label = ({
  htmlfor,
  className,
  text,
}: {
  htmlfor: string;
  className: string;
  text: string;
}) => {
  return (
    <label htmlFor={htmlfor} className={className} aria-labelledby="label">
      {text}
    </label>
  );
};

export default Label;
