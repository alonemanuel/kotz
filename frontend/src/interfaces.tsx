export interface ArticleAttribute {
  title: string;
  subtitle?: string;
  author: string;
  cover_caption: string;
  body: ContentBlock[];
}

export interface Article {
  id: number;
  attributes: ArticleAttribute;
}

export interface TextNode {
  text: string;
  bold?: boolean;
}

export interface ContentBlock {
  type: string;
  children: ContentBlockChild[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ContentBlockChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ArticleContentProps {
  content: ContentBlock[];
}
