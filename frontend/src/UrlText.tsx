import React from "react";

interface UrlTextProps {
  children: any;
}

const UrlText: React.FC<UrlTextProps> = ({children }) => (
  <a href={children.url}>{children.children[0].text}</a>
);

export default UrlText;
