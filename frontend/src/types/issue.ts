import { ContentBlock } from "./jsonBlocksTypes";

export interface Issue {
  name: string;
  number: number;
  guests: ContentBlock[];
  about: string;
  time: string;
  path: string;
  is_published: boolean;
  has_preview: boolean;
  kotz_vector: any;
  inner_image: any;
}
