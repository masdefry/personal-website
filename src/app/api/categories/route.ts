import { NextRequest, NextResponse } from 'next/server';
import Backendless from '../../../lib/backendless';

export async function GET() {
  try {
    const getCategories = await Backendless.Data.of('Categories').find();

    return NextResponse.json(
      { message: `Get Categories Success`, data: getCategories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Get Categories Failed`, error }, { status: 500 });
  }
}
