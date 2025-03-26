import { NextRequest, NextResponse  } from 'next/server';
import Backendless from '../../../../lib/backendless';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const getPosts = await Backendless.Data.of('Posts').find({where: `slug = '${slug}'`});
    
    if (getPosts.length === 0) {
      return NextResponse.json({message: `Post with Slug = ${slug} not found`}, {status: 404});
    }
    return NextResponse.json({message: `Get Post with Slug = ${slug} Success`, data: getPosts}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: `Get Post Failed`, error}, {status: 500});
  }
}