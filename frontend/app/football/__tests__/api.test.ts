import { fetchFootballArticles } from '../api'
import { StrapiFootballArticle } from '../types'

// Mock the fetch function
global.fetch = jest.fn()

describe('Football API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset console.warn mock
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('fetchFootballArticles', () => {
    it('should fetch and transform articles successfully', async () => {
      const mockStrapiArticles: StrapiFootballArticle[] = [
        {
          id: 1,
          documentId: 'abc123',
          title: 'Test Article 1',
          description: 'Description 1',
          author: 'Author 1',
          slug: 'test-article-1',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          publishedAt: '2024-01-01T12:00:00.000Z',
          image: {
            url: '/uploads/test1.jpg',
            name: 'test1.jpg',
            alternativeText: null,
          },
        },
        {
          id: 2,
          documentId: 'def456',
          title: 'Test Article 2',
          description: 'Description 2',
          author: 'Author 2',
          slug: 'test-article-2',
          createdAt: '2024-01-02T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
          publishedAt: '2024-01-02T12:00:00.000Z',
          image: null,
        },
      ]

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockStrapiArticles }),
      })

      const articles = await fetchFootballArticles()

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/football-articles?populate=image&sort=createdAt:desc',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )

      expect(articles).toHaveLength(2)
      expect(articles[0]).toEqual({
        id: 1,
        title: 'Test Article 1',
        description: 'Description 1',
        author: 'Author 1',
        imageUrl: 'http://localhost:1337/uploads/test1.jpg',
        category: 'ΠΟΔΟΣΦΑΙΡΟ',
        categoryColor: 'bg-green-100 text-green-800',
        timeAgo: expect.any(String),
        slug: 'test-article-1',
      })
      expect(articles[1].imageUrl).toBe('/football.png') // Default for null image
    })

    it('should return empty array when API returns non-ok status', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
      expect(console.warn).toHaveBeenCalledWith('Strapi API returned 404')
    })

    it('should return empty array when data is not an array', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: null }),
      })

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
    })

    it('should return empty array when data is missing', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
    })

    it('should handle fetch errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
      expect(console.warn).toHaveBeenCalledWith(
        'Strapi CMS is not available:',
        expect.any(Error)
      )
    })

    it('should handle timeout errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('The operation was aborted due to timeout')
      )

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
      expect(console.warn).toHaveBeenCalled()
    })

    it('should return empty array for empty data array', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })

      const articles = await fetchFootballArticles()

      expect(articles).toEqual([])
    })
  })
})

