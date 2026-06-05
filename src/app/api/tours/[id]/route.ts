import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/tours/[id] - Get single tour
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tour = await db.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...tour,
      gallery: JSON.parse(tour.gallery),
      includesEs: JSON.parse(tour.includesEs),
      includesEn: JSON.parse(tour.includesEn),
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json({ error: 'Failed to fetch tour' }, { status: 500 });
  }
}

// PUT /api/tours/[id] - Update tour
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const tour = await db.tour.update({
      where: { id },
      data: {
        ...(body.slug && { slug: body.slug }),
        ...(body.image && { image: body.image }),
        ...(body.gallery && { gallery: JSON.stringify(body.gallery) }),
        ...(body.nameEs && { nameEs: body.nameEs }),
        ...(body.nameEn && { nameEn: body.nameEn }),
        ...(body.descriptionEs && { descriptionEs: body.descriptionEs }),
        ...(body.descriptionEn && { descriptionEn: body.descriptionEn }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.difficulty && { difficulty: body.difficulty }),
        ...(body.priceUSD !== undefined && { priceUSD: body.priceUSD }),
        ...(body.highSeasonPrice !== undefined && { highSeasonPrice: body.highSeasonPrice }),
        ...(body.includesEs && { includesEs: JSON.stringify(body.includesEs) }),
        ...(body.includesEn && { includesEn: JSON.stringify(body.includesEn) }),
        ...(body.active !== undefined && { active: body.active }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });

    return NextResponse.json(tour);
  } catch (error) {
    console.error('Error updating tour:', error);
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 });
  }
}

// DELETE /api/tours/[id] - Soft delete (set active=false)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tour = await db.tour.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(tour);
  } catch (error) {
    console.error('Error deleting tour:', error);
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 });
  }
}
