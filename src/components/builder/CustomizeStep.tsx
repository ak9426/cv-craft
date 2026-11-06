import React from 'react';
import { CVCustomization, FontFamily, PaperSize, SpacingSize, SectionKey } from '../../types/cv';
import { TEMPLATES } from '../../data/sampleCV';
import { Palette, Type, Layout, ArrowUp, ArrowDown, Check, Sparkles, FileText } from 'lucide-react';

interface Props {
  customization: CVCustomization;
  sectionOrder: SectionKey[];
  isPremiumUser: boolean;
  onCustomizationChange: (customization: Partial<CVCustomization>) => void;
  onSectionOrderChange: (order: SectionKey[]) => void;
  onOpenUpgradeModal: () => void;
}

const COLOR_PRESETS = [
  { name: 'Navy & Teal', primary: '#142B4A', accent: '#14B8A6' },
  { name: 'Royal Blue & Emerald', primary: '#1E3A8A', accent: '#10B981' },
  { name: 'Midnight & Gold', primary: '#0F172A', accent: '#D97706' },
  { name: 'Charcoal & Amber', primary: '#27272A', accent: '#F59E0B' },
  { name: 'Burgundy & Rose', primary: '#881337', accent: '#FB7185' },
  { name: 'Deep Indigo & Violet', primary: '#312E81', accent: '#8B5CF6' },
  { name: 'Forest Emerald', primary: '#064E3B', accent: '#34D399' },
  { name: 'Clean Slate & Cyan', primary: '#334155', accent: '#06B6D4' },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills & Competencies',
  projects: 'Key Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  awards: 'Honors & Awards',
  references: 'References',
  custom: 'Custom Sections',
};

export const CustomizeStep: React.FC<Props> = ({
  customization,
  sectionOrder,
  isPremiumUser,
  onCustomizationChange,
  onSectionOrderChange,
  onOpenUpgradeModal,
}) => {
  const moveSection = (idx: number, dir: 'up' | 'down') => {
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sectionOrder.length) return;
    const copy = [...sectionOrder];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    onSectionOrderChange(copy);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. TEMPLATE CHOOSER */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" /> Choose CV Template (12 Designs)
            </h2>
            <p className="text-sm text-slate-500">
              Switching templates instantly restyles your document without losing any data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = customization.templateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  if (tmpl.isPremium && !isPremiumUser) {
                    onOpenUpgradeModal();
                    return;
                  }
                  onCustomizationChange({
                    templateId: tmpl.id,
                    primaryColor: tmpl.colorPreset.primary,
                    accentColor: tmpl.colorPreset.accent,
                    fontFamily: tmpl.fontPreset,
                  });
                }}
                className={`group cursor-pointer rounded-xl border p-3 transition-all relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-bold text-xs text-slate-900">{tmpl.name}</span>
                  {tmpl.isPremium ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      <Sparkles className="w-2.5 h-2.5" /> PRO
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      FREE
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{tmpl.description}</p>

                {/* Color preview dots */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: tmpl.colorPreset.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: tmpl.colorPreset.accent }} />
                    <span className="text-[10px] text-slate-400 ml-1 font-mono">{tmpl.fontPreset}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. COLOR PALETTE */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-600" /> Color Customization
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COLOR_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onCustomizationChange({ primaryColor: preset.primary, accentColor: preset.accent })}
              className={`p-2 rounded-lg border flex items-center gap-2 text-left transition-all ${
                customization.primaryColor === preset.primary && customization.accentColor === preset.accent
                  ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex -space-x-1">
                <span className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: preset.primary }} />
                <span className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: preset.accent }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate">{preset.name}</span>
            </button>
          ))}
        </div>

        {/* Custom Hex Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customization.primaryColor}
              onChange={(e) => onCustomizationChange({ primaryColor: e.target.value })}
              className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Primary Color</div>
              <div className="text-[11px] text-slate-400 font-mono">{customization.primaryColor}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customization.accentColor}
              onChange={(e) => onCustomizationChange({ accentColor: e.target.value })}
              className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Accent Color</div>
              <div className="text-[11px] text-slate-400 font-mono">{customization.accentColor}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TYPOGRAPHY & LAYOUT SCALING */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-600" /> Typography & Page Sizing
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Font Family</label>
            <select
              value={customization.fontFamily}
              onChange={(e) => onCustomizationChange({ fontFamily: e.target.value as FontFamily })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            >
              <option value="Inter">Inter (Modern & Clean)</option>
              <option value="Merriweather">Merriweather (Classic Editorial)</option>
              <option value="Playfair Display">Playfair Display (Luxury & Executive)</option>
              <option value="Montserrat">Montserrat (Geometric & Bold)</option>
              <option value="Outfit">Outfit (Tech & Fresh)</option>
              <option value="Roboto">Roboto (Versatile Standard)</option>
              <option value="Fira Code">Fira Code (Developer Monospace)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Font Sizing</label>
            <div className="grid grid-cols-3 gap-1">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onCustomizationChange({ fontSize: s })}
                  className={`py-1.5 px-2 rounded-lg capitalize text-xs font-semibold border transition-all ${
                    customization.fontSize === s
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s === 'sm' ? 'Compact' : s === 'md' ? 'Standard' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Paper Format</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['a4', 'letter'] as const).map((paper) => (
                <button
                  key={paper}
                  type="button"
                  onClick={() => onCustomizationChange({ paperSize: paper })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1 ${
                    customization.paperSize === paper
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  {paper === 'a4' ? 'A4 (210×297)' : 'US Letter'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Section Spacing</label>
            <div className="grid grid-cols-3 gap-1">
              {(['compact', 'normal', 'spacious'] as SpacingSize[]).map((spacing) => (
                <button
                  key={spacing}
                  type="button"
                  onClick={() => onCustomizationChange({ sectionSpacing: spacing })}
                  className={`py-1.5 px-2 rounded-lg capitalize text-xs font-semibold border transition-all ${
                    customization.sectionSpacing === spacing
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {spacing}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Text Alignment</label>
            <div className="grid grid-cols-2 gap-1">
              {(['left', 'justify'] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => onCustomizationChange({ textAlign: align })}
                  className={`py-1.5 px-2 rounded-lg capitalize text-xs font-semibold border transition-all ${
                    customization.textAlign === align
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION ORDERING */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Section Order & Arrangement</h3>
            <p className="text-xs text-slate-500">Reorder sections up or down according to your priorities.</p>
          </div>
        </div>

        <div className="space-y-1.5">
          {sectionOrder.map((key, idx) => (
            <div
              key={key}
              className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-white border border-slate-200 text-slate-500 flex items-center justify-center font-mono text-[10px]">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800">{SECTION_LABELS[key] || key}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-white"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => moveSection(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-white"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
