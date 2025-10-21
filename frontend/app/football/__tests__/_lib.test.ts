import { getTimeAgo, getImageUrl, transformArticle } from '../_lib'
import { StrapiFootballArticle } from '../types'

describe('Football Utilities', () => {
  describe('getTimeAgo', () => {
    it('should return "just now" for recent times', () => {
      const now = new Date().toISOString()
      expect(getTimeAgo(now)).toBe('just now')
    })

    it('should return "1 minute ago" for 1 minute', () => {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString()
      expect(getTimeAgo(oneMinuteAgo)).toBe('1 minute ago')
    })

    it('should return "2 minutes ago" for 2 minutes', () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()
      expect(getTimeAgo(twoMinutesAgo)).toBe('2 minutes ago')
    })

    it('should return "1 hour ago" for 1 hour', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(oneHourAgo)).toBe('1 hour ago')
    })

    it('should return "2 hours ago" for 2 hours', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(twoHoursAgo)).toBe('2 hours ago')
    })

    it('should return "1 day ago" for 1 day', () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(oneDayAgo)).toBe('1 day ago')
    })

    it('should return "1 week ago" for 7 days', () => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(oneWeekAgo)).toBe('1 week ago')
    })

    it('should return "1 month ago" for 30 days', () => {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(oneMonthAgo)).toBe('1 month ago')
    })

    it('should return "1 year ago" for 365 days', () => {
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
      expect(getTimeAgo(oneYearAgo)).toBe('1 year ago')
    })
  })

  describe('getImageUrl', () => {
    const originalEnv = process.env.NEXT_PUBLIC_STRAPI_API_URL

    beforeEach(() => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = 'http://localhost:1337'
    })

    afterEach(() => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = originalEnv
    })

    it('should return default fallback for undefined', () => {
      expect(getImageUrl(undefined)).toBe('/football.png')
    })

    it('should return default fallback for empty string', () => {
      expect(getImageUrl('')).toBe('/football.png')
    })

    it('should return absolute HTTP URL as-is', () => {
      const url = 'http://example.com/image.jpg'
      expect(getImageUrl(url)).toBe(url)
    })

    it('should return absolute HTTPS URL as-is', () => {
      const url = 'https://example.com/image.jpg'
      expect(getImageUrl(url)).toBe(url)
    })

    it('should prepend Strapi URL for relative paths', () => {
      expect(getImageUrl('/uploads/test.jpg')).toBe('http://localhost:1337/uploads/test.jpg')
    })
  })

  describe('transformArticle', () => {
    it('should transform Strapi article to frontend format', () => {
      const strapiArticle: StrapiFootballArticle = {
        id: 1,
        documentId: 'abc123',
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        slug: 'test-title',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T12:00:00.000Z',
        image: {
          url: '/uploads/test.jpg',
          name: 'test.jpg',
          alternativeText: 'Test Image',
        },
      }

      const result = transformArticle(strapiArticle)

      expect(result).toEqual({
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        imageUrl: 'http://localhost:1337/uploads/test.jpg',
        category: 'ΠΟΔΟΣΦΑΙΡΟ',
        categoryColor: 'bg-green-100 text-green-800',
        timeAgo: expect.any(String),
        slug: 'test-title',
      })
    })

    it('should use default image when no image provided', () => {
      const strapiArticle: StrapiFootballArticle = {
        id: 1,
        documentId: 'abc123',
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        slug: 'test-title',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T12:00:00.000Z',
        image: null,
      }

      const result = transformArticle(strapiArticle)

      expect(result.imageUrl).toBe('/football.png')
    })

    it('should use createdAt when publishedAt is not available', () => {
      const createdAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      
      const strapiArticle: StrapiFootballArticle = {
        id: 1,
        documentId: 'abc123',
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        slug: 'test-title',
        createdAt: createdAt,
        updatedAt: createdAt,
        publishedAt: '',
        image: null,
      }

      const result = transformArticle(strapiArticle)

      expect(result.timeAgo).toContain('ago')
    })
  })
})

