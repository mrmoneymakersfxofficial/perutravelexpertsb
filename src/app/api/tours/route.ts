import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/tours - Return all active tours
export async function GET() {
  try {
    const tours = await db.tour.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    // Parse JSON strings back to arrays
    const parsedTours = tours.map((tour) => ({
      ...tour,
      gallery: JSON.parse(tour.gallery),
      includesEs: JSON.parse(tour.includesEs),
      includesEn: JSON.parse(tour.includesEn),
    }));

    return NextResponse.json(parsedTours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}

// POST /api/tours - Create new tour
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tour = await db.tour.create({
      data: {
        slug: body.slug,
        image: body.image,
        gallery: JSON.stringify(body.gallery || []),
        nameEs: body.nameEs,
        nameEn: body.nameEn,
        descriptionEs: body.descriptionEs,
        descriptionEn: body.descriptionEn,
        duration: body.duration,
        difficulty: body.difficulty,
        priceUSD: body.priceUSD,
        highSeasonPrice: body.highSeasonPrice || null,
        includesEs: JSON.stringify(body.includesEs || []),
        includesEn: JSON.stringify(body.includesEn || []),
        active: body.active ?? true,
        featured: body.featured ?? false,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 });
  }
}
