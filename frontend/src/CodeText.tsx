import React from "react";

interface CodeTextProps {
  children: React.ReactNode;
}

const CodeText: React.FC<CodeTextProps> = ({ children }) => (
  <code>{children + "​"}</code>
);

export default CodeText;
