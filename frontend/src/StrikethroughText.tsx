import React from "react";

interface StrikethroughTextProps {
  children: React.ReactNode;
}

const StrikethroughText: React.FC<StrikethroughTextProps> = ({ children }) => (
  <s>{children + "​"}</s>
);

export default StrikethroughText;
