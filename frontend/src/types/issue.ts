import { ContentBlock } from "./jsonBlocksTypes";

export interface Issue {
  name: string;
  number: number;
  guests: ContentBlock[];
  path: string;
}
