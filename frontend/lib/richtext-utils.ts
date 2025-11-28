/**
 * Utilities for rendering Strapi richtext content
 *
 * Strapi v5 Blocks fields return JSON content that needs to be converted to HTML.
 * This utility handles both Blocks format and legacy markdown strings.
 */

import { marked } from 'marked';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Text node with formatting
interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

// Link node
interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

// Child can be text or link
type InlineNode = TextNode | LinkNode;

// Video block interface
interface VideoBlock {
  type: 'video';
  provider: 'youtube';
  url: string;
  videoId?: string;
}

// Block types for Strapi v5 Blocks
export interface RichtextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code' | 'image' | 'video';
  children?: InlineNode[] | RichtextBlock[];
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: 'ordered' | 'unordered';
  image?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  // Video properties
  provider?: 'youtube';
  url?: string;
  videoId?: string;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeVideoId(url: string): string {
  // Handle different YouTube URL formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/v/VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
}

/**
 * Render video block (YouTube embed)
 */
function renderVideoBlock(block: RichtextBlock): string {
  if (!block.url) return '';

  // Extract or use provided videoId
  const videoId = block.videoId || extractYouTubeVideoId(block.url);

  if (!videoId) {
    console.warn('Could not extract video ID from URL:', block.url);
    return '';
  }

  // Use youtube-nocookie.com for privacy
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return `
    <div class="video-embed-wrapper">
      <div class="video-embed-container">
        <iframe
          src="${embedUrl}"
          title="YouTube video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  `;
}

/**
 * Render inline text with formatting
 */
function renderInlineNode(node: InlineNode): string {
  if (node.type === 'text') {
    let text = node.text;
    // Escape HTML special characters
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<s>${text}</s>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }

  if (node.type === 'link') {
    const linkText = node.children?.map(child => renderInlineNode(child)).join('') || node.url;
    return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  }

  return '';
}

/**
 * Render a single richtext block to HTML
 */
function renderBlock(block: RichtextBlock): string {
  // Handle video blocks
  if (block.type === 'video') {
    return renderVideoBlock(block);
  }

  // Handle image blocks
  if (block.type === 'image' && block.image) {
    let imageUrl = block.image.url || '';
    // Prepend STRAPI_URL if it's a relative path
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${STRAPI_URL}${imageUrl}`;
    }
    const alt = block.image.alternativeText || '';
    return `<figure><img src="${imageUrl}" alt="${alt}" loading="lazy" /></figure>`;
  }

  if (!block.children || block.children.length === 0) return '';

  // Handle list blocks (children are list-item blocks)
  if (block.type === 'list') {
    const tag = block.format === 'ordered' ? 'ol' : 'ul';
    const items = (block.children as RichtextBlock[]).map(item => {
      if ('children' in item && Array.isArray(item.children)) {
        const itemContent = (item.children as InlineNode[]).map(renderInlineNode).join('');
        return `<li>${itemContent}</li>`;
      }
      return '';
    }).join('');
    return `<${tag}>${items}</${tag}>`;
  }

  // Handle inline content (paragraphs, headings, quotes, code)
  const content = (block.children as InlineNode[]).map(renderInlineNode).join('');

  switch (block.type) {
    case 'paragraph':
      return `<p>${content}</p>`;
    case 'heading':
      const level = block.level || 2;
      return `<h${level}>${content}</h${level}>`;
    case 'quote':
      return `<blockquote>${content}</blockquote>`;
    case 'code':
      return `<pre><code>${content}</code></pre>`;
    default:
      return content ? `<p>${content}</p>` : '';
  }
}

/**
 * Convert Strapi richtext to HTML string
 * Handles blocks format, markdown strings, and plain HTML
 */
export function richtextToHtml(content: unknown): string {
  // If it's already a string, assume it's markdown and parse it
  if (typeof content === 'string') {
    try {
      // Configure marked for better parsing
      marked.setOptions({
        breaks: true,
        gfm: true,
      });
      
      // Parse markdown to HTML synchronously
      const html = marked.parse(content, { async: false }) as string;
      return html;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return content;
    }
  }

  // If it's an array of blocks, render each block
  if (Array.isArray(content)) {
    return content.map(block => renderBlock(block)).join('');
  }

  // If it's an object with blocks property
  if (content && typeof content === 'object' && 'blocks' in content) {
    const contentObj = content as { blocks?: unknown };
    if (Array.isArray(contentObj.blocks)) {
      return contentObj.blocks.map((block: RichtextBlock) => renderBlock(block)).join('');
    }
  }

  // Fallback: return empty string
  return '';
}

/**
 * Extract plain text from richtext (for previews, meta descriptions, etc.)
 */
export function richtextToPlainText(content: unknown): string {
  const html = richtextToHtml(content);
  // Simple HTML tag removal (for more robust solution, consider using a library)
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Dynamic Zone component interfaces
 */
export interface TextBlockComponent {
  __component: 'article.text-block';
  id: number;
  content: unknown; // Blocks format
}

export interface VideoEmbedComponent {
  __component: 'article.video-embed';
  id: number;
  videoUrl: string;
  caption?: string;
}

export interface ImageEmbedComponent {
  __component: 'article.image-embed';
  id: number;
  image: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
  caption?: string;
  altText?: string;
}

export type DynamicZoneComponent = TextBlockComponent | VideoEmbedComponent | ImageEmbedComponent;

/**
 * Render Dynamic Zone components (Text Blocks, Video Embeds, Image Embeds)
 * Used for article content that can mix text, videos, and images
 */
export function renderDynamicZone(components: unknown): string {
  if (!Array.isArray(components)) {
    return '';
  }

  return components.map(component => {
    if (!component || typeof component !== 'object') {
      return '';
    }

    const comp = component as DynamicZoneComponent;

    switch (comp.__component) {
      case 'article.text-block':
        // Render the text block using the existing richtextToHtml function
        return richtextToHtml(comp.content);

      case 'article.video-embed':
        // Extract video ID from URL
        const videoId = extractYouTubeVideoId(comp.videoUrl);

        if (!videoId) {
          console.warn('Could not extract video ID from URL:', comp.videoUrl);
          return '';
        }

        // Render video embed with optional caption
        const videoCaption = comp.caption
          ? `<figcaption class="text-center text-gray-600 mt-2 text-sm">${comp.caption}</figcaption>`
          : '';

        return `
          <div class="video-embed-wrapper">
            <div class="video-embed-container">
              <iframe
                src="https://www.youtube-nocookie.com/embed/${videoId}"
                title="${comp.caption || 'YouTube video'}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
            ${videoCaption}
          </div>
        `;

      case 'article.image-embed':
        const imgComp = comp as ImageEmbedComponent;
        if (!imgComp.image?.url) {
          console.warn('Image embed missing image URL');
          return '';
        }

        // Handle relative URLs from Strapi
        let imageUrl = imgComp.image.url;
        if (!imageUrl.startsWith('http')) {
          imageUrl = `${STRAPI_URL}${imageUrl}`;
        }

        const altAttribute = imgComp.altText || imgComp.image.alternativeText || '';
        const imageCaption = imgComp.caption
          ? `<figcaption class="text-center text-gray-600 mt-3 text-sm italic">${imgComp.caption}</figcaption>`
          : '';

        return `
          <figure class="image-embed-wrapper my-8">
            <img 
              src="${imageUrl}" 
              alt="${altAttribute}"
              loading="lazy"
              class="w-full h-auto rounded-lg shadow-md"
            />
            ${imageCaption}
          </figure>
        `;

      default:
        console.warn('Unknown component type:', (component as any).__component);
        return '';
    }
  }).join('');
}

