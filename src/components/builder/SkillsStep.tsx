import React, { useState } from 'react';
import { SkillItem } from '../../types/cv';
import { Plus, Trash2, Sparkles, Loader2, Check, Tag } from 'lucide-react';
import { fetchSkillSuggestions, SkillSuggestResponse } from '../../services/aiService';

interface Props {
  skills: SkillItem[];
  jobTitle: string;
  onChange: (skills: SkillItem[]) => void;
}

export const SkillsStep: React.FC<Props> = ({ skills, jobTitle, onChange }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState<'technical' | 'soft' | 'tool' | 'language'>('technical');
  const [newProficiency, setNewProficiency] = useState<number>(4);
  const [aiSuggestions, setAiSuggestions] = useState<SkillSuggestResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const addSkill = (name: string, category: 'technical' | 'soft' | 'tool' | 'language', prof: number) => {
    if (!name.trim()) return;
    const label = prof === 5 ? 'Expert' : prof === 4 ? 'Advanced' : prof === 3 ? 'Intermediate' : 'Beginner';
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: name.trim(),
      category,
      proficiency: prof,
      levelLabel: label,
    };
    onChange([...skills, newSkill]);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillName, newCategory, newProficiency);
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const handleGetSuggestions = async () => {
    setLoadingAi(true);
    try {
      const data = await fetchSkillSuggestions(jobTitle);
      setAiSuggestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAddAllSuggestions = () => {
    if (!aiSuggestions) return;
    const existing = new Set(skills.map((s) => s.name.toLowerCase()));
    const toAdd: SkillItem[] = [];

    (aiSuggestions.technical || []).forEach((name) => {
      if (!existing.has(name.toLowerCase())) {
        toAdd.push({
          id: `sk-${Date.now()}-${Math.random()}`,
          name,
          category: 'technical',
          proficiency: 4,
          levelLabel: 'Advanced',
        });
        existing.add(name.toLowerCase());
      }
    });

    (aiSuggestions.soft || []).forEach((name) => {
      if (!existing.has(name.toLowerCase())) {
        toAdd.push({
          id: `sk-${Date.now()}-${Math.random()}`,
          name,
          category: 'soft',
          proficiency: 5,
          levelLabel: 'Expert',
        });
        existing.add(name.toLowerCase());
      }
    });

    (aiSuggestions.tools || []).forEach((name) => {
      if (!existing.has(name.toLowerCase())) {
        toAdd.push({
          id: `sk-${Date.now()}-${Math.random()}`,
          name,
          category: 'tool',
          proficiency: 4,
          levelLabel: 'Advanced',
        });
        existing.add(name.toLowerCase());
      }
    });

    onChange([...skills, ...toAdd]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Skills & Competencies</h2>
          <p className="text-sm text-slate-500">
            Showcase technical tools, software, methodologies, and interpersonal qualities.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGetSuggestions}
          disabled={loadingAi}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all disabled:opacity-50"
        >
          {loadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
          AI Suggest Skills for {jobTitle ? `"${jobTitle}"` : 'Your Role'}
        </button>
      </div>

      {/* AI Suggestion Box */}
      {aiSuggestions && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Recommended Skills for {jobTitle || 'Your Field'}:
            </span>
            <button
              type="button"
              onClick={handleAddAllSuggestions}
              className="text-xs text-indigo-700 font-bold hover:underline"
            >
              + Add All Suggested
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[...(aiSuggestions.technical || []), ...(aiSuggestions.soft || []), ...(aiSuggestions.tools || [])].map(
              (name, i) => {
                const already = skills.some((s) => s.name.toLowerCase() === name.toLowerCase());
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={already}
                    onClick={() => addSkill(name, 'technical', 4)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                      already
                        ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-default'
                        : 'bg-white hover:bg-indigo-600 hover:text-white text-indigo-900 border-indigo-200 shadow-2xs'
                    }`}
                  >
                    {already ? <Check className="w-3 h-3 text-slate-400" /> : <Plus className="w-3 h-3" />}
                    {name}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Manual Input Form */}
      <form onSubmit={handleManualAdd} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Add a Custom Skill</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="e.g. React.js, Strategic Planning, Python"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
            >
              <option value="technical">Technical Skill</option>
              <option value="soft">Soft / Leadership</option>
              <option value="tool">Tool / Software</option>
              <option value="language">Programming / Language</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>
        </div>
      </form>

      {/* Skills Pill List */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Added Skills ({skills.length})
          </span>
          <span className="text-xs text-slate-400">Click × to remove</span>
        </div>

        {skills.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-white border border-dashed rounded-xl">
            No skills added yet. Use the AI suggestions above or type your skills.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs text-xs text-slate-800 hover:border-slate-300 transition-all"
              >
                <Tag className="w-3 h-3 text-blue-500" />
                <span className="font-semibold">{skill.name}</span>
                {skill.levelLabel && (
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {skill.levelLabel}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
