import React from "react";
import { Link as Router } from "react-router-dom";
const Link = ({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Router to={url} className={className}>
      {children}
    </Router>
  );
};

export default Link;
