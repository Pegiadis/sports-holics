import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleImageEmbed extends Struct.ComponentSchema {
  collectionName: 'components_article_image_embeds';
  info: {
    description: 'Embed an image within article content';
    displayName: 'Image Embed';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ArticleSocialMediaEmbed extends Struct.ComponentSchema {
  collectionName: 'components_article_social_media_embeds';
  info: {
    description: 'Embed social media posts from Twitter/X, Facebook, TikTok, Instagram';
    displayName: 'Social Media Embed';
    icon: 'share-alt';
  };
  attributes: {
    caption: Schema.Attribute.String;
    embedCode: Schema.Attribute.Text & Schema.Attribute.Required;
    platform: Schema.Attribute.Enumeration<
      ['twitter', 'facebook', 'tiktok', 'instagram']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'twitter'>;
  };
}

export interface ArticleTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_article_text_blocks';
  info: {
    description: 'Rich text content block with Blocks editor';
    displayName: 'Text Block';
    icon: 'align-left';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ArticleVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_article_video_embeds';
  info: {
    description: 'YouTube video embed';
    displayName: 'Video Embed';
    icon: 'play-circle';
  };
  attributes: {
    caption: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    description: 'Social media meta tags for Facebook and Twitter';
    displayName: 'Meta Social';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for articles';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.image-embed': ArticleImageEmbed;
      'article.social-media-embed': ArticleSocialMediaEmbed;
      'article.text-block': ArticleTextBlock;
      'article.video-embed': ArticleVideoEmbed;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
