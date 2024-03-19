export interface ArticleAttribute {
  title: string;
  subtitle?: string;
  author: string;
  cover_caption: string;
  body: ContentBlock[];
  outside_img_vertical: any;
  outside_img_horizontal: any;
  terms: any;
  type: string;
  debates:any;
}

export interface Article {
  id: number;
  attributes: ArticleAttribute;
}

export interface Term {
  id: number;
  title: string;
  definition: string;
  img: string;
}

export interface TextNode {
  text: string;
  bold?: boolean;
}

export interface ContentBlock {
  type: string;
  children?: ContentBlockChild[];
  text?: string;
  image?: ImageBlock;
  level?:number;
}

export interface ContentBlockChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ImageBlock {
  url: string;
  caption?: string;
  alternativeText?: string;
}

export interface ArticleContentProps {
  content: ContentBlock[];
}
