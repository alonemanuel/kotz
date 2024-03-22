import React from "react";

interface UnderlineTextProps {
  children: React.ReactNode;
}

const UnderlineText: React.FC<UnderlineTextProps> = ({ children }) => <u>{children}</u>;

export default UnderlineText;
