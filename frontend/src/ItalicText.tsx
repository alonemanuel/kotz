import React from "react";

interface ItalicTextProps {
  children: React.ReactNode;
}

const ItalicText: React.FC<ItalicTextProps> = ({ children }) => <i>{children}</i>;

export default ItalicText;
