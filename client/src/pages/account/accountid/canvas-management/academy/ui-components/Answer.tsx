import React, { ReactNode } from "react";

const Answer = ({ children }: { children: ReactNode }) => {
  return (
    <p
      className="text-white cursor-text w-auto block"
      style={{ fontSize: "14px" }}
    >
      {children}
    </p>
  );
};

export default Answer;
