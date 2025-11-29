'use client';

import { useEffect, useRef } from 'react';

interface ArticleContentProps {
  html: string;
  className?: string;
}

/**
 * Article content wrapper that adds lazy loading for social media embeds
 * Processes the server-rendered HTML and adds loading states
 */
export default function ArticleContent({ html, className = '' }: ArticleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all social media embed wrappers
    const embedWrappers = containerRef.current.querySelectorAll('.social-media-embed-wrapper');

    embedWrappers.forEach((wrapper) => {
      const platform = wrapper.getAttribute('data-platform') as string;
      const container = wrapper.querySelector('.social-media-embed-container');

      if (!container) return;

      // Platform config for skeleton
      const platformConfig: Record<string, { name: string; color: string; icon: string }> = {
        twitter: { name: 'Twitter / X', color: '#1DA1F2', icon: '𝕏' },
        facebook: { name: 'Facebook', color: '#1877F2', icon: 'f' },
        instagram: { name: 'Instagram', color: '#E4405F', icon: '📷' },
        tiktok: { name: 'TikTok', color: '#000000', icon: '♪' },
      };

      const config = platformConfig[platform] || { name: 'Social Media', color: '#6c757d', icon: '🔗' };

      // Create skeleton placeholder
      const skeleton = document.createElement('div');
      skeleton.className = 'social-embed-skeleton';
      skeleton.innerHTML = `
        <div class="skeleton-header">
          <div class="skeleton-icon" style="background-color: ${config.color}">
            ${config.icon}
          </div>
          <div class="skeleton-text">
            <div class="skeleton-line skeleton-line-short"></div>
            <div class="skeleton-line skeleton-line-medium"></div>
          </div>
        </div>
        <div class="skeleton-body">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line-medium"></div>
        </div>
        <div class="skeleton-footer">
          <span class="skeleton-loading-text">Φόρτωση ${config.name}...</span>
          <div class="skeleton-spinner"></div>
        </div>
      `;

      // Hide the embed container initially
      container.classList.add('embed-loading');

      // Insert skeleton before container
      wrapper.insertBefore(skeleton, container);

      // Set up Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start loading the embed
              loadEmbed(wrapper as HTMLElement, container as HTMLElement, skeleton, platform);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '200px', // Start loading 200px before visible
          threshold: 0.1,
        }
      );

      observer.observe(wrapper);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Load and reveal the social media embed
 */
function loadEmbed(
  wrapper: HTMLElement,
  container: HTMLElement,
  skeleton: HTMLElement,
  platform: string
) {
  // Process platform-specific embeds
  setTimeout(() => {
    // Process Twitter embeds
    if (platform === 'twitter' && window.twttr?.widgets) {
      window.twttr.widgets.load(container);
    }

    // Process Instagram embeds
    if (platform === 'instagram' && window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }

    // Wait a bit for the embed to render, then reveal
    setTimeout(() => {
      skeleton.style.display = 'none';
      container.classList.remove('embed-loading');
      container.classList.add('embed-loaded');
    }, 800);
  }, 100);
}

// TypeScript declarations for social media globals
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

