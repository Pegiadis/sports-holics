/**
 * Utilities for rendering Strapi richtext content
 * 
 * Strapi richtext fields can return content in blocks format (array of content blocks)
 * or as a string. This utility handles both cases.
 */

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
  }>;
  level?: number;
  format?: string;
}

/**
 * Render a single richtext block to HTML
 */
function renderBlock(block: RichtextBlock): string {
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
 * Handles both blocks format and plain string
 */
export function richtextToHtml(content: unknown): string {
  // If it's already a string, return as is (might be HTML or markdown)
  if (typeof content === 'string') {
    return content;
  }

  // If it's an array of blocks, render each block
  if (Array.isArray(content)) {
    return content.map(block => renderBlock(block)).join('');
  }

  // If it's an object with blocks property
  if (content && typeof content === 'object' && Array.isArray(content.blocks)) {
    return content.blocks.map((block: RichtextBlock) => renderBlock(block)).join('');
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

