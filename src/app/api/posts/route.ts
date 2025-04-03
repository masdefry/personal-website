import { NextRequest, NextResponse } from 'next/server';
import Backendless from '../../../lib/backendless';

function generateSlug(title: string) {
  return title
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, author, imageUrl, description } = await req.json();
    const slug = generateSlug(title);
    await Backendless.Data.of('Posts').save({
      title,
      content,
      author,
      imageUrl,
      description,
      slug,
    });
    return NextResponse.json(
      {
        message: 'Create Post Successfully',
        data: {
          title,
          content,
          author,
          imageUrl,
          slug: title.split(' ').join('-'),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Create Post Failed', error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');

    let query = '';

    if (category) {
      query += `categoryName = '${category}'`;
    }

    if (search) {
      if (query) query += ' AND ';
      query += `(title LIKE '%${search}%' OR description LIKE '%${search}%')`;
    }

    const queryBuilder = Backendless.DataQueryBuilder.create();
    if (query) {
      queryBuilder.setWhereClause(query);
    }

    const getPosts = await Backendless.Data.of('Posts').find(queryBuilder);
    console.log(getPosts)
    return NextResponse.json(
      { message: 'Get Posts Success', data: getPosts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Get Posts Failed', error },
      { status: 500 }
    );
  }
}
