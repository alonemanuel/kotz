import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => <p>{children}</p>;

export default Paragraph;
