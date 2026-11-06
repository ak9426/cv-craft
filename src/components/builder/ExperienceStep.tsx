import React, { useState } from 'react';
import { WorkExperience } from '../../types/cv';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Loader2, Check, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { enhanceAIBullet } from '../../services/aiService';

interface Props {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export const ExperienceStep: React.FC<Props> = ({ experiences, onChange }) => {
  const [activeExpId, setActiveExpId] = useState<string | null>(experiences[0]?.id || null);
  const [bulletDraft, setBulletDraft] = useState('');
  const [enhancedResult, setEnhancedResult] = useState('');
  const [enhancing, setEnhancing] = useState(false);
  const [selectedExpForAi, setSelectedExpForAi] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      jobTitle: '',
      employmentType: 'Full-time',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      responsibilities: '',
      keyAchievements: '',
    };
    onChange([newExp, ...experiences]);
    setActiveExpId(newExp.id);
  };

  const updateExperience = (id: string, updated: Partial<WorkExperience>) => {
    onChange(experiences.map((exp) => (exp.id === id ? { ...exp, ...updated } : exp)));
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= experiences.length) return;
    const copy = [...experiences];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  const handleEnhanceBullet = async (expId: string, currentTitle: string) => {
    if (!bulletDraft.trim()) return;
    setEnhancing(true);
    setSelectedExpForAi(expId);
    try {
      const res = await enhanceAIBullet(bulletDraft, currentTitle);
      setEnhancedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleApplyBullet = (expId: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp || !enhancedResult) return;
    const current = exp.responsibilities ? exp.responsibilities.trim() + '\n' : '';
    updateExperience(expId, { responsibilities: current + enhancedResult });
    setEnhancedResult('');
    setBulletDraft('');
    setSelectedExpForAi(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Work Experience</h2>
          <p className="text-sm text-slate-500">
            List your relevant roles in reverse chronological order. Highlight accomplishments with numbers.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No experience added yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Click below to add your current or past job positions.</p>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
          >
            Add Your First Position
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const isExpanded = activeExpId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                {/* Header Row */}
                <div
                  onClick={() => setActiveExpId(isExpanded ? null : exp.id)}
                  className="p-4 bg-slate-50/70 hover:bg-slate-100/60 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {exp.jobTitle || 'Untitled Role'}
                        {exp.company && <span className="text-slate-500 font-normal"> at {exp.company}</span>}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {exp.startDate || 'Start Date'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End Date'}
                        {exp.location ? ` • ${exp.location}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveExperience(index, 'up')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === experiences.length - 1}
                      onClick={() => moveExperience(index, 'down')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                      title="Delete Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Job Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lead Frontend Developer"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Company Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Stripe, Acme Corp"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Employment Type
                        </label>
                        <select
                          value={exp.employmentType}
                          onChange={(e) => updateExperience(exp.id, { employmentType: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Remote">Remote</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. New York, NY (Hybrid)"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Start Date (Month & Year)
                        </label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            End Date
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.isCurrent}
                              onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: '' })}
                              className="w-3.5 h-3.5 text-blue-600 rounded"
                            />
                            Currently Working Here
                          </label>
                        </div>
                        <input
                          type="month"
                          disabled={exp.isCurrent}
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* AI Bullet Point Enhancer Bar */}
                    <div className="p-3.5 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 rounded-lg border border-blue-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        AI Bullet Improver: Turn a casual duty into a high-impact achievement
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. helped with frontend testing and fixed bugs"
                          value={bulletDraft}
                          onChange={(e) => setBulletDraft(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-blue-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          disabled={enhancing || !bulletDraft.trim()}
                          onClick={() => handleEnhanceBullet(exp.id, exp.jobTitle)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 disabled:opacity-50"
                        >
                          {enhancing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Enhance'}
                        </button>
                      </div>

                      {enhancedResult && selectedExpForAi === exp.id && (
                        <div className="mt-2 p-2.5 bg-white rounded border border-blue-200 text-xs space-y-2">
                          <div className="text-slate-800 font-medium italic">"{enhancedResult}"</div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEnhancedResult('')}
                              className="text-slate-500 hover:text-slate-700 text-[11px]"
                            >
                              Dismiss
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyBullet(exp.id)}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Append to Responsibilities
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Responsibilities Textarea */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Job Responsibilities & Bullets (One per line)
                      </label>
                      <textarea
                        rows={5}
                        placeholder="• Architected microservices supporting 4M daily active users&#10;• Mentored 8 junior and mid-level software engineers&#10;• Automated testing pipeline achieving 94% code coverage"
                        value={exp.responsibilities}
                        onChange={(e) => updateExperience(exp.id, { responsibilities: e.target.value })}
                        className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 font-mono text-slate-800 leading-relaxed"
                      />
                    </div>

                    {/* Key Milestone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Achievement / Highlight Metric (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Awarded MVP of Q3 after boosting checkout conversion rate by 28%."
                        value={exp.keyAchievements || ''}
                        onChange={(e) => updateExperience(exp.id, { keyAchievements: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-800"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
