import ConceptForm from '@/components/admin/ConceptForm';

export default function NewConceptPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New concept</h1>
      <p className="mt-1 text-slate-500">Add bilingual content with a daily-life example and quiz.</p>
      <div className="mt-6">
        <ConceptForm />
      </div>
    </div>
  );
}
