/**
 * Utilities for rendering Strapi richtext content
 * 
 * Strapi richtext fields can return content in blocks format (array of content blocks)
 * or as a markdown string. This utility handles both cases.
 */

import { marked } from 'marked';

export interface RichtextBlock {
  type: string;
  children?: Array<{
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    url?: string;
  }>;
  level?: number;
  format?: string;
  url?: string;
  image?: {
    url?: string;
    alternativeText?: string;
  };
}

/**
 * Render a single richtext block to HTML
 */
function renderBlock(block: RichtextBlock): string {
  if (block.type === 'image' && block.image) {
    const imageUrl = block.image.url || '';
    const alt = block.image.alternativeText || '';
    return `<img src="${imageUrl}" alt="${alt}" />`;
  }

  if (!block.children) return '';

  const content = block.children.map(child => {
    if (child.type === 'text' && child.text) {
      let text = child.text;
      if (child.bold) text = `<strong>${text}</strong>`;
      if (child.italic) text = `<em>${text}</em>`;
      if (child.underline) text = `<u>${text}</u>`;
      if (child.strikethrough) text = `<s>${text}</s>`;
      if (child.code) text = `<code>${text}</code>`;
      return text;
    }
    if (child.type === 'link' && child.url) {
      return `<a href="${child.url}">${child.text || child.url}</a>`;
    }
    return child.text || '';
  }).join('');

  switch (block.type) {
    case 'paragraph':
      return `<p>${content}</p>`;
    case 'heading':
      const level = block.level || 1;
      return `<h${level}>${content}</h${level}>`;
    case 'list':
      const tag = block.format === 'ordered' ? 'ol' : 'ul';
      return `<${tag}>${content}</${tag}>`;
    case 'list-item':
      return `<li>${content}</li>`;
    case 'quote':
      return `<blockquote>${content}</blockquote>`;
    case 'code':
      return `<pre><code>${content}</code></pre>`;
    default:
      return content;
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

