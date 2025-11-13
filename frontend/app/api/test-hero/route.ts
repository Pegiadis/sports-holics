import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function GET() {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('populate', 'backgroundImage');
    params.append('pagination[limit]', '1');

    const url = `${STRAPI_URL}/api/hero-sections?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch', status: response.status }, { status: 500 });
    }

    const data = await response.json();
    const hero = data.data?.[0];

    if (!hero) {
      return NextResponse.json({ error: 'No hero section found' }, { status: 404 });
    }

    const imageUrl = hero.backgroundImage?.url;

    const result = {
      STRAPI_URL,
      rawImageUrl: imageUrl,
      startsWithHttp: imageUrl?.startsWith('http://'),
      startsWithHttps: imageUrl?.startsWith('https://'),
      isAbsolute: imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://'),
      finalUrl: null as string | null,
    };

    if (imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://')) {
      result.finalUrl = imageUrl;
    } else if (imageUrl) {
      result.finalUrl = `${STRAPI_URL}${imageUrl}`;
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

