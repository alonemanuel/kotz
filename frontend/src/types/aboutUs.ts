import { ContentBlock } from "./jsonBlocksTypes";

export interface AboutUs {
  title: string;
  subtitle: string;
  body: ContentBlock[];
  body_caption: string;
  teams: any[];
}
