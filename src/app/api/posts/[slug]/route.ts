import { NextRequest, NextResponse } from 'next/server';
import Backendless from '../../../../lib/backendless';

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.pathname.split('/').pop(); 

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    const getPosts = await Backendless.Data.of('Posts').find({ where: `slug = '${slug}'` });

    if (getPosts.length === 0) {
      return NextResponse.json({ message: `Post with Slug = ${slug} not found` }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Get Post with Slug = ${slug} Success`, data: getPosts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Get Post Failed`, error }, { status: 500 });
  }
}
