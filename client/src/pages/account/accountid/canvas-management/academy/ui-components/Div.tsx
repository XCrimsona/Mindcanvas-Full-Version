import React, { ReactNode } from "react";

//DRY Component for FAQ on Academy page
const Div = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-75 p-2 rounded-sm sm:w-85 bg-[#000a] md:w-140 lg:w-100 mb-8">
      {children}
    </div>
  );
};

export default Div;
