import { render, screen } from '@testing-library/react'
import FootballPage from '../page'
import { fetchFootballArticles } from '../api'
import { FootballArticle } from '../types'

// Mock the API
jest.mock('../api')
const mockFetchFootballArticles = fetchFootballArticles as jest.MockedFunction<
  typeof fetchFootballArticles
>

// Mock components
jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}))

jest.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}))

jest.mock('../FootballCard', () => ({
  __esModule: true,
  default: ({ article }: { article: FootballArticle }) => (
    <div data-testid="football-card">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
    </div>
  ),
}))

describe('FootballPage', () => {
  const mockArticles: FootballArticle[] = [
    {
      id: 1,
      title: 'Test Article 1',
      description: 'Description 1',
      author: 'Author 1',
      imageUrl: '/test1.jpg',
      category: 'ΠΟΔΟΣΦΑΙΡΟ',
      categoryColor: 'bg-green-100 text-green-800',
      timeAgo: '1 hour ago',
      slug: 'test-article-1',
    },
    {
      id: 2,
      title: 'Test Article 2',
      description: 'Description 2',
      author: 'Author 2',
      imageUrl: '/test2.jpg',
      category: 'ΠΟΔΟΣΦΑΙΡΟ',
      categoryColor: 'bg-green-100 text-green-800',
      timeAgo: '2 hours ago',
      slug: 'test-article-2',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render page header with title', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(screen.getByText('Ποδόσφαιρο')).toBeInTheDocument()
  })

  it('should render page description', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(
      screen.getByText('Όλα τα νέα και οι ειδήσεις για το ποδόσφαιρο')
    ).toBeInTheDocument()
  })

  it('should render Header component', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('should render Footer component', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should fetch and display articles', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(mockFetchFootballArticles).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Test Article 1')).toBeInTheDocument()
    expect(screen.getByText('Test Article 2')).toBeInTheDocument()
  })

  it('should render correct number of FootballCard components', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    const cards = screen.getAllByTestId('football-card')
    expect(cards).toHaveLength(2)
  })

  it('should show empty state when no articles', async () => {
    mockFetchFootballArticles.mockResolvedValue([])

    render(await FootballPage())

    expect(
      screen.getByText('Δεν υπάρχουν διαθέσιμα άρθρα αυτή τη στιγμή.')
    ).toBeInTheDocument()
  })

  it('should not show empty state when articles exist', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(
      screen.queryByText('Δεν υπάρχουν διαθέσιμα άρθρα αυτή τη στιγμή.')
    ).not.toBeInTheDocument()
  })

  it('should render football icon emoji', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    expect(screen.getByText('⚽')).toBeInTheDocument()
  })

  it('should have correct page structure', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    const { container } = render(await FootballPage())

    // Check for main container
    const mainElement = container.querySelector('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('max-w-4xl')
  })

  it('should handle API errors gracefully', async () => {
    mockFetchFootballArticles.mockResolvedValue([])

    render(await FootballPage())

    // Should still render the page structure
    expect(screen.getByText('Ποδόσφαιρο')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should display articles in the correct order', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    render(await FootballPage())

    const cards = screen.getAllByTestId('football-card')
    expect(cards[0]).toHaveTextContent('Test Article 1')
    expect(cards[1]).toHaveTextContent('Test Article 2')
  })

  it('should render with responsive layout classes', async () => {
    mockFetchFootballArticles.mockResolvedValue(mockArticles)

    const { container } = render(await FootballPage())

    const mainContainer = container.querySelector('.min-h-screen')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('bg-gray-50')
  })
})

