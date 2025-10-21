import { render, screen } from '@testing-library/react'
import FootballCard from '../FootballCard'
import { FootballArticle } from '../types'

describe('FootballCard', () => {
  const mockArticle: FootballArticle = {
    id: 1,
    title: 'Test Football Article',
    description: 'This is a test description for a football article',
    author: 'John Doe',
    imageUrl: '/test-image.jpg',
    category: 'ΠΟΔΟΣΦΑΙΡΟ',
    categoryColor: 'bg-green-100 text-green-800',
    timeAgo: '2 hours ago',
    slug: 'test-football-article',
  }

  it('should render article title', () => {
    render(<FootballCard article={mockArticle} />)
    expect(screen.getByText('Test Football Article')).toBeInTheDocument()
  })

  it('should render article description', () => {
    render(<FootballCard article={mockArticle} />)
    expect(
      screen.getByText('This is a test description for a football article')
    ).toBeInTheDocument()
  })

  it('should render category badge', () => {
    render(<FootballCard article={mockArticle} />)
    expect(screen.getByText('ΠΟΔΟΣΦΑΙΡΟ')).toBeInTheDocument()
  })

  it('should render author name', () => {
    render(<FootballCard article={mockArticle} />)
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('should render time ago', () => {
    render(<FootballCard article={mockArticle} />)
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
  })

  it('should render image with correct src', () => {
    render(<FootballCard article={mockArticle} />)
    const image = screen.getByAltText('Test Football Article')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('should apply correct CSS classes for layout', () => {
    const { container } = render(<FootballCard article={mockArticle} />)
    const article = container.querySelector('article')
    
    expect(article).toHaveClass('bg-white')
    expect(article).toHaveClass('rounded-lg')
    expect(article).toHaveClass('shadow-md')
  })

  it('should render all meta information', () => {
    render(<FootballCard article={mockArticle} />)
    
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('should handle long descriptions', () => {
    const longArticle: FootballArticle = {
      ...mockArticle,
      description: 'This is a very long description '.repeat(20),
    }

    render(<FootballCard article={longArticle} />)
    expect(screen.getByText(/This is a very long description/)).toBeInTheDocument()
  })

  it('should handle different categories', () => {
    const customArticle: FootballArticle = {
      ...mockArticle,
      category: 'PREMIER LEAGUE',
    }

    render(<FootballCard article={customArticle} />)
    expect(screen.getByText('PREMIER LEAGUE')).toBeInTheDocument()
  })

  it('should handle Greek characters in title', () => {
    const greekArticle: FootballArticle = {
      ...mockArticle,
      title: 'Ο Μέσι Σκοράρει Χατ-Τρικ',
    }

    render(<FootballCard article={greekArticle} />)
    expect(screen.getByText('Ο Μέσι Σκοράρει Χατ-Τρικ')).toBeInTheDocument()
  })

  it('should be wrapped in article semantic HTML tag', () => {
    const { container } = render(<FootballCard article={mockArticle} />)
    const articleElement = container.querySelector('article')
    expect(articleElement).toBeInTheDocument()
  })
})

