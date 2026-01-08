import React, { ReactNode } from "react";

const Option = ({
  id,
  className,
  value,
  optionText,
}: {
  id: string;
  className: string;
  value: string | number;
  optionText: string | number;
}) => {
  return (
    <option id={id} className={className} value={value}>
      {optionText}
    </option>
  );
};

export default Option;
