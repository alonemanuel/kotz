import React from "react";

interface BoldTextProps {
  children: React.ReactNode;
}

const BoldText: React.FC<BoldTextProps> = ({ children }) => <b>{children}</b>;

export default BoldText;
