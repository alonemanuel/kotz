export interface ContentBlockChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ContentBlock {
  type: string;
  children: ContentBlockChild[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
}
