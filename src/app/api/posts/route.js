import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SocialPost from '@/models/SocialPost';
import { requireUser } from '@/lib/guards';

const PLATFORMS = ['linkedin', 'instagram', 'x', 'reddit'];

function publicPost(p) {
  return {
    id: p._id.toString(),
    platform: p.platform,
    topic: p.topic,
    tone: p.tone,
    hook: p.hook,
    body: p.body,
    thread: p.thread,
    slides: p.slides,
    hashtags: p.hashtags,
    notes: p.notes,
    source: p.source,
    model: p.model,
    edited: p.edited,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export async function GET(req) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const params = new URL(req.url).searchParams;
  const query = { userId: session.user.id };
  if (PLATFORMS.includes(params.get('platform'))) query.platform = params.get('platform');

  const posts = await SocialPost.find(query).sort({ updatedAt: -1 }).limit(50).lean();
  return NextResponse.json({ posts: posts.map(publicPost) });
}

// Save a generated post as a draft.
export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const body = (await req.json().catch(() => ({}))) || {};
  if (!String(body.body || '').trim()) {
    return NextResponse.json({ error: 'There is no post text to save' }, { status: 400 });
  }

  await connectDB();
  const doc = await SocialPost.create({
    userId: session.user.id,
    platform: PLATFORMS.includes(body.platform) ? body.platform : 'linkedin',
    topic: String(body.topic || '').slice(0, 300),
    tone: String(body.tone || '').slice(0, 60),
    hook: String(body.hook || '').slice(0, 600),
    body: String(body.body).slice(0, 12000),
    thread: Array.isArray(body.thread) ? body.thread.slice(0, 20) : [],
    slides: Array.isArray(body.slides) ? body.slides.slice(0, 20) : [],
    hashtags: Array.isArray(body.hashtags) ? body.hashtags.slice(0, 20) : [],
    notes: String(body.notes || '').slice(0, 800),
    resultId: body.resultId || null,
    provider: body.provider || '',
    model: body.model || '',
    source: body.source === 'demo' ? 'demo' : 'ai',
    edited: Boolean(body.edited),
  });

  return NextResponse.json({ post: publicPost(doc) }, { status: 201 });
}
