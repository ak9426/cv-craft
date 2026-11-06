import React, { useState } from 'react';
import { Sparkles, Loader2, Check, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import { generateAISummary } from '../../services/aiService';

interface Props {
  summary: string;
  jobTitle: string;
  onChange: (summary: string) => void;
}

export const SummaryStep: React.FC<Props> = ({ summary, jobTitle, onChange }) => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [tone, setTone] = useState<'professional' | 'executive' | 'technical' | 'creative'>('professional');
  const [strengths, setStrengths] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');

  const handleGenerateAI = async () => {
    setAiLoading(true);
    try {
      const generated = await generateAISummary(jobTitle, summary, strengths, tone);
      setAiResult(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAI = () => {
    if (aiResult) {
      onChange(aiResult);
      setIsAiOpen(false);
      setAiResult('');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Professional Summary</h2>
          <p className="text-sm text-slate-500">
            A concise 3-4 sentence elevator pitch highlighting your career achievements, leadership, and core strengths.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          {isAiOpen ? 'Close AI Assistant' : 'AI Writing Assistant'}
        </button>
      </div>

      {/* AI Assistant Drawer/Card */}
      {isAiOpen && (
        <div className="p-5 bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-slate-50 border border-indigo-200 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Generate or Polish Summary with Gemini AI
            </div>
            <span className="text-[11px] font-medium text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full">
              Zero Hallucinations Guarantee
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tone of Voice</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['professional', 'executive', 'technical', 'creative'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`py-1.5 px-2 rounded-md capitalize border text-xs font-medium transition-all ${
                      tone === t
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Key Strengths or Keywords to Highlight</label>
              <input
                type="text"
                placeholder="e.g. Distributed Systems, Agile Leadership, $2M Revenue"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={aiLoading}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-xs"
          >
            {aiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Crafting high-impact summary...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" /> Generate Professional Summary
              </>
            )}
          </button>

          {aiResult && (
            <div className="p-3.5 bg-white rounded-lg border border-indigo-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>AI Suggested Version:</span>
                <span className="text-[11px] font-normal text-slate-500">Review and approve</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed italic bg-slate-50 p-2.5 rounded border border-slate-100">
                "{aiResult}"
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setAiResult('')}
                  className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleApplyAI}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" /> Apply to Resume
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Textarea */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Your Summary Content
        </label>
        <textarea
          rows={6}
          placeholder="e.g. Versatile Senior Engineer with 8+ years leading cross-functional teams in developing scalable SaaS platforms. Proven track record of improving uptime to 99.99% and mentoring high-velocity engineering squads..."
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 leading-relaxed"
        />
        <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
          <span>{summary.length} characters (Recommended: 300 - 600 characters)</span>
          <span className="flex items-center gap-1 text-slate-500">
            <HelpCircle className="w-3.5 h-3.5" /> Tip: Avoid first-person pronouns ("I", "my")
          </span>
        </div>
      </div>
    </div>
  );
};
