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

export async function GET() {
  try {
    const getPosts = await Backendless.Data.of('Posts').find();

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
