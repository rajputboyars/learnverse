'use client';

import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';
import RankingView from './views/RankingView';
import JobsView from './views/JobsView';
import ComparisonView from './views/ComparisonView';
import ResourcesView from './views/ResourcesView';
import AnalysisView from './views/AnalysisView';
import RoadmapView from './views/RoadmapView';
import ExplainView from './views/ExplainView';
import PostView from './views/PostView';

const VIEWS = {
  ranking: RankingView,
  jobs: JobsView,
  comparison: ComparisonView,
  resources: ResourcesView,
  analysis: AnalysisView,
  roadmap: RoadmapView,
  explain: ExplainView,
  post: PostView,
};

/**
 * Picks the renderer for a result. When structured output was expected but the
 * model returned prose (or a shape we cannot read), the raw text is shown
 * rather than an error — a readable answer beats a failed run.
 */
export default function AIResultView({ result }) {
  const { pick } = useLang();
  const View = VIEWS[result?.resultView];

  if (View && result?.data) {
    return <View data={result.data} result={result} />;
  }

  return (
    <div className="space-y-3">
      {result?.unparsed && (
        <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
          {pick(
            'Model ne structured format ki jagah plain text mein jawab diya, isliye ye uska raw reply hai.',
            'The model answered in plain text instead of the structured format, so this is its raw reply.'
          )}
        </p>
      )}
      <div className="prose-content rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        {result?.text || pick('Koi content wapas nahi aaya.', 'No content came back.')}
      </div>
    </div>
  );
}
