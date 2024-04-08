import { ContentBlock } from "./jsonBlocksTypes";

export interface AboutUs {
  title: string;
  subtitle: string;
  body: ContentBlock[];
  body_caption: string;
  teams: any[];
  credit_tagline: string;
  fonts: ContentBlock[];
}
