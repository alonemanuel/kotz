import React from "react";

interface ItalicTextProps {
  children: React.ReactNode;
}

const ItalicText: React.FC<ItalicTextProps> = ({ children }) => <b>{children}</b>;

export default ItalicText;
