import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import ConceptForm from '@/components/admin/ConceptForm';

export const dynamic = 'force-dynamic';

export default async function EditConceptPage({ params }) {
  const { id } = await params;
  await connectDB();
  const concept = await Concept.findById(id).lean().catch(() => null);
  if (!concept) notFound();
  const initial = JSON.parse(JSON.stringify(concept));

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit concept</h1>
      <p className="mt-1 text-slate-500">Update content, examples, code and quiz.</p>
      <div className="mt-6">
        <ConceptForm initial={initial} conceptId={id} />
      </div>
    </div>
  );
}
