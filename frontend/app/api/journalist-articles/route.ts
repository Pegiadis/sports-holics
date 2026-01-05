import { NextRequest, NextResponse } from 'next/server';
import { fetchAllArticlesByJournalist } from '@/app/blog/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '30', 10);

    if (!slug) {
      return NextResponse.json(
        { error: 'Journalist slug is required' },
        { status: 400 }
      );
    }

    const articles = await fetchAllArticlesByJournalist(slug, page, pageSize);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching journalist articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

