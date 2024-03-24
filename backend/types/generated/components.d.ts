import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedAnswer extends Schema.Component {
  collectionName: 'components_shared_answers';
  info: {
    displayName: 'answer';
    icon: 'feather';
  };
  attributes: {
    tag: Attribute.String;
    body: Attribute.Text & Attribute.Required;
  };
}

export interface SharedAnswer0 extends Schema.Component {
  collectionName: 'components_shared_answer0s';
  info: {
    displayName: 'answer0';
    icon: 'car';
  };
  attributes: {
    tag: Attribute.String;
    answer: Attribute.Text;
  };
}

export interface SharedDebate extends Schema.Component {
  collectionName: 'components_shared_debates';
  info: {
    displayName: 'debate';
  };
  attributes: {
    author: Attribute.String;
    lead: Attribute.Text;
    author_img: Attribute.Media;
    body: Attribute.Blocks;
  };
}

export interface SharedMember extends Schema.Component {
  collectionName: 'components_shared_members';
  info: {
    displayName: 'member';
  };
  attributes: {
    member: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedSong extends Schema.Component {
  collectionName: 'components_shared_songs';
  info: {
    displayName: 'song';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Blocks;
    author: Attribute.String;
  };
}

export interface SharedTeam extends Schema.Component {
  collectionName: 'components_shared_teams';
  info: {
    displayName: 'team';
    icon: 'chartBubble';
  };
  attributes: {
    name: Attribute.String;
    members: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.answer': SharedAnswer;
      'shared.answer0': SharedAnswer0;
      'shared.debate': SharedDebate;
      'shared.member': SharedMember;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.song': SharedSong;
      'shared.team': SharedTeam;
    }
  }
}
