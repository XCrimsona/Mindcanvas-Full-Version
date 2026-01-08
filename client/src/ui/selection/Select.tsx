import React, { ReactNode } from "react";

const Select = ({
  id,
  className,
  children,
  value,
  onChange,
}: {
  id: string;
  className: string;
  children: ReactNode;
  value: string;
  onChange: () => void;
}) => {
  return (
    <select id={id} className={className} value={value} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
