import React from 'react';
import { LanguageItem, AwardItem, ReferenceItem, CustomSection } from '../../types/cv';
import { Plus, Trash2, Languages, Award, UserCheck, Layers } from 'lucide-react';

interface Props {
  languages: LanguageItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
  customSections: CustomSection[];
  onLanguagesChange: (languages: LanguageItem[]) => void;
  onAwardsChange: (awards: AwardItem[]) => void;
  onReferencesChange: (references: ReferenceItem[]) => void;
  onCustomSectionsChange: (customSections: CustomSection[]) => void;
}

export const AdditionalStep: React.FC<Props> = ({
  languages,
  awards,
  references,
  customSections,
  onLanguagesChange,
  onAwardsChange,
  onReferencesChange,
  onCustomSectionsChange,
}) => {
  // Languages
  const addLanguage = () => {
    onLanguagesChange([
      ...languages,
      { id: `lang-${Date.now()}`, name: '', proficiency: 'Professional' },
    ]);
  };
  const updateLanguage = (id: string, updated: Partial<LanguageItem>) => {
    onLanguagesChange(languages.map((l) => (l.id === id ? { ...l, ...updated } : l)));
  };
  const removeLanguage = (id: string) => {
    onLanguagesChange(languages.filter((l) => l.id !== id));
  };

  // Awards
  const addAward = () => {
    onAwardsChange([
      ...awards,
      { id: `award-${Date.now()}`, title: '', issuer: '', year: new Date().getFullYear().toString(), description: '' },
    ]);
  };
  const updateAward = (id: string, updated: Partial<AwardItem>) => {
    onAwardsChange(awards.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };
  const removeAward = (id: string) => {
    onAwardsChange(awards.filter((a) => a.id !== id));
  };

  // References
  const addReference = () => {
    onReferencesChange([
      ...references,
      { id: `ref-${Date.now()}`, name: '', company: '', jobTitle: '', email: '', phone: '' },
    ]);
  };
  const updateReference = (id: string, updated: Partial<ReferenceItem>) => {
    onReferencesChange(references.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };
  const removeReference = (id: string) => {
    onReferencesChange(references.filter((r) => r.id !== id));
  };

  // Custom Sections
  const addCustomSection = () => {
    onCustomSectionsChange([
      ...customSections,
      {
        id: `sec-${Date.now()}`,
        heading: 'Publications & Speaking',
        items: [{ id: `item-${Date.now()}`, title: '', subtitle: '', date: '', description: '' }],
      },
    ]);
  };
  const updateCustomSectionHeading = (secId: string, heading: string) => {
    onCustomSectionsChange(customSections.map((s) => (s.id === secId ? { ...s, heading } : s)));
  };
  const removeCustomSection = (secId: string) => {
    onCustomSectionsChange(customSections.filter((s) => s.id !== secId));
  };
  const addCustomItem = (secId: string) => {
    onCustomSectionsChange(
      customSections.map((s) =>
        s.id === secId
          ? {
              ...s,
              items: [
                ...s.items,
                { id: `item-${Date.now()}`, title: '', subtitle: '', date: '', description: '' },
              ],
            }
          : s
      )
    );
  };
  const updateCustomItem = (secId: string, itemId: string, updated: any) => {
    onCustomSectionsChange(
      customSections.map((s) =>
        s.id === secId
          ? {
              ...s,
              items: s.items.map((i) => (i.id === itemId ? { ...i, ...updated } : i)),
            }
          : s
      )
    );
  };
  const removeCustomItem = (secId: string, itemId: string) => {
    onCustomSectionsChange(
      customSections.map((s) =>
        s.id === secId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      )
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* LANGUAGES */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-blue-600" /> Languages
            </h3>
            <p className="text-xs text-slate-500">Spoken and written language proficiency.</p>
          </div>
          <button
            type="button"
            onClick={addLanguage}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Language
          </button>
        </div>

        {languages.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center border border-dashed rounded-lg">
            No languages added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {languages.map((lang) => (
              <div key={lang.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. English, French"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })}
                  className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AWARDS */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Honors & Awards
            </h3>
            <p className="text-xs text-slate-500">Hackathon victories, industry recognitions, scholarships.</p>
          </div>
          <button
            type="button"
            onClick={addAward}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Award
          </button>
        </div>

        {awards.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center border border-dashed rounded-lg">
            No awards added yet.
          </div>
        ) : (
          <div className="space-y-2">
            {awards.map((award) => (
              <div key={award.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Award Title (e.g. Employee of the Year)"
                    value={award.title}
                    onChange={(e) => updateAward(award.id, { title: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2023)"
                    value={award.year}
                    onChange={(e) => updateAward(award.id, { year: e.target.value })}
                    className="w-24 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeAward(award.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Issuer (e.g. Microsoft Innovation Forum)"
                  value={award.issuer}
                  onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REFERENCES */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" /> Professional References
            </h3>
            <p className="text-xs text-slate-500">Mentors, managers, or directors available upon request.</p>
          </div>
          <button
            type="button"
            onClick={addReference}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Reference
          </button>
        </div>

        {references.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center border border-dashed rounded-lg">
            No references specified yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {references.map((ref) => (
              <div key={ref.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Reference Contact</span>
                  <button
                    type="button"
                    onClick={() => removeReference(ref.id)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={ref.name}
                  onChange={(e) => updateReference(ref.id, { name: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, { company: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={ref.jobTitle}
                    onChange={(e) => updateReference(ref.id, { jobTitle: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={ref.email}
                  onChange={(e) => updateReference(ref.id, { email: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOM SECTIONS */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" /> Custom Sections
            </h3>
            <p className="text-xs text-slate-500">
              Add any custom block like Volunteer Work, Publications, Patents, or Memberships.
            </p>
          </div>
          <button
            type="button"
            onClick={addCustomSection}
            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom Section
          </button>
        </div>

        {customSections.map((sec) => (
          <div key={sec.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <input
                type="text"
                placeholder="Section Title"
                value={sec.heading}
                onChange={(e) => updateCustomSectionHeading(sec.id, e.target.value)}
                className="font-bold text-sm text-slate-900 px-2 py-1 bg-slate-50 border rounded"
              />
              <button
                type="button"
                onClick={() => removeCustomSection(sec.id)}
                className="text-rose-500 hover:text-rose-700 text-xs font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Section
              </button>
            </div>

            <div className="space-y-2">
              {sec.items.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-lg space-y-2 text-xs">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Item Title (e.g. Published Paper, Volunteer Lead)"
                      value={item.title}
                      onChange={(e) => updateCustomItem(sec.id, item.id, { title: e.target.value })}
                      className="flex-1 px-2 py-1 bg-white border rounded font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g. 2022)"
                      value={item.date || ''}
                      onChange={(e) => updateCustomItem(sec.id, item.id, { date: e.target.value })}
                      className="w-24 px-2 py-1 bg-white border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomItem(sec.id, item.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Subtitle or Organization (e.g. IEEE Journal, Red Cross)"
                    value={item.subtitle || ''}
                    onChange={(e) => updateCustomItem(sec.id, item.id, { subtitle: e.target.value })}
                    className="w-full px-2 py-1 bg-white border rounded"
                  />
                  <textarea
                    rows={2}
                    placeholder="Description..."
                    value={item.description}
                    onChange={(e) => updateCustomItem(sec.id, item.id, { description: e.target.value })}
                    className="w-full px-2 py-1 bg-white border rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addCustomItem(sec.id)}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add item to {sec.heading}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
