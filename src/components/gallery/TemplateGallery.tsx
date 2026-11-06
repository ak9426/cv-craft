import React, { useState } from 'react';
import { TemplateMeta, TemplateId, CVData, CVCustomization } from '../../types/cv';
import { TEMPLATES, SAMPLE_CV } from '../../data/sampleCV';
import { CVRenderer } from '../templates/CVRenderer';
import { Layout, Check, Sparkles, Filter, Eye, ArrowRight, X } from 'lucide-react';

interface Props {
  currentTemplateId: TemplateId;
  isPremiumUser: boolean;
  onSelectTemplate: (templateId: TemplateId) => void;
  onOpenUpgradeModal: () => void;
}

export const TemplateGallery: React.FC<Props> = ({
  currentTemplateId,
  isPremiumUser,
  onSelectTemplate,
  onOpenUpgradeModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'premium'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMeta | null>(null);

  const categories = ['All', 'Modern', 'Corporate', 'Minimalist', 'Creative', 'Executive', 'Academic', 'ATS-Friendly'];

  const filteredTemplates = TEMPLATES.filter((tmpl) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      tmpl.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesType =
      filterType === 'all' ||
      (filterType === 'free' && !tmpl.isPremium) ||
      (filterType === 'premium' && tmpl.isPremium);
    return matchesCategory && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      {/* Title & Filter Bar */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Layout className="w-3.5 h-3.5" /> 12 Handcrafted CV Templates
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find the Perfect Resume Template for Your Career
        </h1>
        <p className="text-sm text-slate-600">
          Every template is engineered to balance visual elegance with recruiter readability. Switch templates anytime with 1 click without losing your entered data.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Show:</span>
          {(['all', 'free', 'premium'] as const).map((ft) => (
            <button
              key={ft}
              type="button"
              onClick={() => setFilterType(ft)}
              className={`px-2.5 py-1 rounded capitalize font-medium ${
                filterType === ft
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ft}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tmpl) => {
          const isCurrent = currentTemplateId === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between ${
                isCurrent ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200'
              }`}
            >
              {/* Thumbnail Representation */}
              <div
                onClick={() => setPreviewTemplate(tmpl)}
                className="relative bg-slate-100 h-64 p-4 flex items-center justify-center cursor-pointer group-hover:bg-slate-200/60 transition-colors overflow-hidden"
              >
                {/* Mini mock page representation */}
                <div className="w-44 h-56 bg-white rounded shadow-md border border-slate-200 p-2.5 space-y-2 pointer-events-none transform group-hover:scale-105 transition-transform">
                  <div className="h-4 rounded-xs" style={{ backgroundColor: tmpl.colorPreset.primary }} />
                  <div className="h-1.5 w-2/3 bg-slate-300 rounded-xs" />
                  <div className="h-1 w-full bg-slate-200 rounded-xs" />
                  <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="h-1.5 w-1/3 rounded-xs" style={{ backgroundColor: tmpl.colorPreset.accent }} />
                    <div className="h-1 w-full bg-slate-100 rounded-xs" />
                    <div className="h-1 w-full bg-slate-100 rounded-xs" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs backdrop-blur-xs">
                    {tmpl.thumbnailBadge}
                  </span>
                  {tmpl.isPremium && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> PRO
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
                  <span className="px-3.5 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Quick Preview
                  </span>
                </div>
              </div>

              {/* Template Card Details */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{tmpl.name}</h3>
                    <span className="text-xs text-slate-500">{tmpl.category} Style</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: tmpl.colorPreset.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: tmpl.colorPreset.accent }} />
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{tmpl.description}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (tmpl.isPremium && !isPremiumUser) {
                        onOpenUpgradeModal();
                      } else {
                        onSelectTemplate(tmpl.id);
                      }
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isCurrent
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Currently Selected
                      </>
                    ) : (
                      <>
                        Select Template <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal Preview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-base text-slate-900">{previewTemplate.name}</h3>
                <p className="text-xs text-slate-500">{previewTemplate.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-slate-100 flex justify-center">
              <div className="scale-75 origin-top shadow-xl">
                <CVRenderer
                  data={SAMPLE_CV}
                  customization={{
                    templateId: previewTemplate.id,
                    fontFamily: previewTemplate.fontPreset,
                    fontSize: 'md',
                    primaryColor: previewTemplate.colorPreset.primary,
                    accentColor: previewTemplate.colorPreset.accent,
                    sectionSpacing: 'normal',
                    paperSize: 'a4',
                    textAlign: 'left',
                  }}
                />
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Font: <strong>{previewTemplate.fontPreset}</strong> • Category: <strong>{previewTemplate.category}</strong>
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (previewTemplate.isPremium && !isPremiumUser) {
                      setPreviewTemplate(null);
                      onOpenUpgradeModal();
                    } else {
                      onSelectTemplate(previewTemplate.id);
                      setPreviewTemplate(null);
                    }
                  }}
                  className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
