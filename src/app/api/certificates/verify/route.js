import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Certificate from '@/models/Certificate';

// GET /api/certificates/verify?id=LV-HTML-9F21A → public lookup, no auth.
// Only returns fields safe to show to anyone (no userId, no email).
export async function GET(request) {
  const id = (request.nextUrl.searchParams.get('id') || '').trim().toUpperCase();
  if (!id) {
    return NextResponse.json({ error: 'Certificate ID required' }, { status: 400 });
  }
  try {
    await connectDB();
    const cert = await Certificate.findOne({ certId: id }).lean();
    if (!cert) {
      return NextResponse.json({ error: 'No certificate found with that ID' }, { status: 404 });
    }
    return NextResponse.json({
      certId: cert.certId,
      userName: cert.userName,
      courseTitle: cert.courseTitle,
      courseIcon: cert.courseIcon,
      totalConcepts: cert.totalConcepts,
      completedAt: cert.completedAt,
    });
  } catch (err) {
    console.error('GET /api/certificates/verify failed:', err);
    return NextResponse.json({ error: 'Verification temporarily unavailable' }, { status: 503 });
  }
}
