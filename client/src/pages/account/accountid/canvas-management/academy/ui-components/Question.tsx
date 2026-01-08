import React, { ReactNode } from "react";

const Question = ({ children }: { children: ReactNode }) => {
  return (
    <p
      className="text-white cursor-text pb-2 w-auto block"
      style={{ fontSize: "18px" }}
    >
      {children}
    </p>
  );
};

export default Question;
