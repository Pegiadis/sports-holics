import { FootballArticle, StrapiFootballArticle } from '../types'

describe('Football Types', () => {
  describe('FootballArticle', () => {
    it('should have correct structure', () => {
      const article: FootballArticle = {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        imageUrl: '/test.jpg',
        category: 'ΠΟΔΟΣΦΑΙΡΟ',
        categoryColor: 'bg-green-100 text-green-800',
        timeAgo: '2 hours ago',
        slug: 'test-title',
      }

      expect(article.id).toBe(1)
      expect(article.title).toBe('Test Title')
      expect(article.description).toBe('Test Description')
      expect(article.author).toBe('Test Author')
      expect(article.imageUrl).toBe('/test.jpg')
      expect(article.category).toBe('ΠΟΔΟΣΦΑΙΡΟ')
      expect(article.slug).toBe('test-title')
    })
  })

  describe('StrapiFootballArticle', () => {
    it('should have correct structure', () => {
      const strapiArticle: StrapiFootballArticle = {
        id: 1,
        documentId: 'abc123',
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        slug: 'test-title',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        image: {
          url: '/uploads/test.jpg',
          name: 'test.jpg',
          alternativeText: 'Test Image',
        },
      }

      expect(strapiArticle.id).toBe(1)
      expect(strapiArticle.documentId).toBe('abc123')
      expect(strapiArticle.title).toBe('Test Title')
      expect(strapiArticle.image?.url).toBe('/uploads/test.jpg')
    })

    it('should allow null image', () => {
      const strapiArticle: StrapiFootballArticle = {
        id: 1,
        documentId: 'abc123',
        title: 'Test Title',
        description: 'Test Description',
        author: 'Test Author',
        slug: 'test-title',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        image: null,
      }

      expect(strapiArticle.image).toBeNull()
    })
  })
})

