import React, { useState } from 'react';
import { CVData, CVCustomization } from '../../types/cv';
import { performATSCheck, ATSCheckResponse } from '../../services/aiService';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Loader2,
  FileSearch,
  ListChecks,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface Props {
  data: CVData;
  customization: CVCustomization;
  onApplyATSTemplate: () => void;
}

export const ATSCheckerSuite: React.FC<Props> = ({ data, customization, onApplyATSTemplate }) => {
  const [targetJobTitle, setTargetJobTitle] = useState(data.personalInfo.jobTitle || '');
  const [targetJobDesc, setTargetJobDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSCheckResponse | null>(null);

  // Heuristic static checks for instant feedback
  const hasEmail = Boolean(data.personalInfo.email);
  const hasPhone = Boolean(data.personalInfo.phone);
  const hasLocation = Boolean(data.personalInfo.city || data.personalInfo.country);
  const hasSummary = Boolean(data.summary && data.summary.length > 50);
  const hasWorkExp = data.experiences.length > 0;
  const hasMetrics = data.experiences.some(
    (e) => /\d+%|\$\d+|\d+\s*users|\d+\s*teams|\d+\s*engineers/i.test(e.responsibilities || '')
  );
  const isATSDesign = customization.templateId === 'ats-friendly';

  // Calculate quick score
  let baseScore = 60;
  if (hasEmail) baseScore += 5;
  if (hasPhone) baseScore += 5;
  if (hasLocation) baseScore += 5;
  if (hasSummary) baseScore += 5;
  if (hasWorkExp) baseScore += 10;
  if (hasMetrics) baseScore += 5;
  if (isATSDesign) baseScore += 5;

  const currentScore = atsResult ? atsResult.score : Math.min(95, baseScore);

  const handleRunFullAudit = async () => {
    setIsLoading(true);
    try {
      const res = await performATSCheck(targetJobTitle, targetJobDesc, data);
      setAtsResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn p-4 sm:p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> ATS Compatibility Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ATS Scanner & Keyword Alignment
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Over 75% of resumes are filtered by Applicant Tracking Systems before a human recruiter reads them. Check formatting, keyword density, and actionable metrics.
          </p>
        </div>

        {/* Circular / Card Score */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center min-w-[170px] shadow-lg">
          <div className="text-xs uppercase tracking-widest text-blue-200 font-bold mb-1">ATS Match Score</div>
          <div className="text-4xl sm:text-5xl font-black text-white flex items-center justify-center">
            {currentScore}
            <span className="text-xl text-blue-300 font-normal">/100</span>
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold mt-1 flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {currentScore >= 85 ? 'Excellent Pass Rate' : currentScore >= 70 ? 'Good Alignment' : 'Needs Optimization'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input Target Job Spec */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-blue-600" /> Target Job Details
          </h3>
          <p className="text-xs text-slate-500">
            Paste the target job description or requirements to scan your CV for missing keywords.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Job Title</label>
            <input
              type="text"
              placeholder="e.g. Senior Software Architect"
              value={targetJobTitle}
              onChange={(e) => setTargetJobTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Job Description</label>
            <textarea
              rows={6}
              placeholder="Paste job posting duties, required qualifications, and technologies here..."
              value={targetJobDesc}
              onChange={(e) => setTargetJobDesc(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={handleRunFullAudit}
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Audit Resume for ATS
              </>
            )}
          </button>

          {!isATSDesign && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Switch to ATS Clean Scan
              </div>
              <p className="text-[11px] text-amber-700 leading-tight">
                Your current template is styled with visual enhancements. Switch to our 100% linear ATS Clean Scan template for maximum parser compatibility.
              </p>
              <button
                type="button"
                onClick={onApplyATSTemplate}
                className="w-full py-1.5 bg-amber-600 text-white rounded text-xs font-semibold hover:bg-amber-700"
              >
                Apply ATS-Friendly Template
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Live Checklist & Recommendations */}
        <div className="lg:col-span-2 space-y-5">
          {/* Static Parser Checklist */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-emerald-600" /> Standard ATS Hygiene Checklist
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="text-slate-700">Email Address Included</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="text-slate-700">Phone Number Included</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasLocation ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="text-slate-700">Location (City & Country)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasSummary ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="text-slate-700">Structured Summary Block</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasWorkExp ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className="text-slate-700">Chronological Work Experience</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                {hasMetrics ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="text-slate-700">Quantifiable Metrics (% or $)</span>
              </div>
            </div>
          </div>

          {/* AI ATS Insights if Audited */}
          {atsResult && (
            <div className="bg-white p-5 rounded-xl border border-blue-200 space-y-4 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" /> AI Diagnostic Analysis
                </h4>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Target: {targetJobTitle || 'General'}
                </span>
              </div>

              {/* Match Highlights */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Identified Strengths:
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {atsResult.matchHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Recommended Keywords to Incorporate:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action items */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Actionable Steps:
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {atsResult.actionItems.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Legal / Ethics Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              <strong>Notice:</strong> ATS compatibility optimization tools assist in formatting and keyword alignment. CVCraft does not claim guaranteed ATS compatibility or employment success.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
