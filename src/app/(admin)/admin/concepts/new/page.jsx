import ConceptForm from '@/components/admin/ConceptForm';

export default function NewConceptPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">New concept</h1>
      <p className="mt-1 text-muted">Add bilingual content with a daily-life example and quiz.</p>
      <div className="mt-6">
        <ConceptForm />
      </div>
    </div>
  );
}
