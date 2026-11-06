import React, { useState } from 'react';
import { CVData, CVCustomization, SectionKey } from '../../types/cv';
import { PersonalInfoStep } from './PersonalInfoStep';
import { SummaryStep } from './SummaryStep';
import { ExperienceStep } from './ExperienceStep';
import { EducationStep } from './EducationStep';
import { SkillsStep } from './SkillsStep';
import { ProjectsStep } from './ProjectsStep';
import { AdditionalStep } from './AdditionalStep';
import { CustomizeStep } from './CustomizeStep';
import { LivePreviewPanel } from '../preview/LivePreviewPanel';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Layers,
  Palette,
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  data: CVData;
  customization: CVCustomization;
  isPremiumUser: boolean;
  onDataChange: (data: CVData) => void;
  onCustomizationChange: (customization: Partial<CVCustomization>) => void;
  onSaveCV: () => void;
  onLoadSample: () => void;
  onResetBlank: () => void;
  onOpenUpgradeModal: () => void;
  onOpenATSChecker: () => void;
  lastSavedAt?: string;
}

const WIZARD_STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Summary', icon: FileText },
  { id: 3, title: 'Experience', icon: Briefcase },
  { id: 4, title: 'Education', icon: GraduationCap },
  { id: 5, title: 'Skills', icon: Code2 },
  { id: 6, title: 'Projects & Certs', icon: FolderGit2 },
  { id: 7, title: 'Additional', icon: Layers },
  { id: 8, title: 'Design & Templates', icon: Palette },
];

export const CVBuilderWorkspace: React.FC<Props> = ({
  data,
  customization,
  isPremiumUser,
  onDataChange,
  onCustomizationChange,
  onSaveCV,
  onLoadSample,
  onResetBlank,
  onOpenUpgradeModal,
  onOpenATSChecker,
  lastSavedAt,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Quick calculate ATS score for header pill
  const hasEmail = Boolean(data.personalInfo.email);
  const hasPhone = Boolean(data.personalInfo.phone);
  const hasSummary = Boolean(data.summary && data.summary.length > 50);
  const hasExp = data.experiences.length > 0;
  let atsScore = 60 + (hasEmail ? 10 : 0) + (hasPhone ? 10 : 0) + (hasSummary ? 10 : 0) + (hasExp ? 10 : 0);
  atsScore = Math.min(96, atsScore);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            info={data.personalInfo}
            onChange={(updated) => onDataChange({ ...data, personalInfo: { ...data.personalInfo, ...updated } })}
          />
        );
      case 2:
        return (
          <SummaryStep
            summary={data.summary}
            jobTitle={data.personalInfo.jobTitle}
            onChange={(summary) => onDataChange({ ...data, summary })}
          />
        );
      case 3:
        return (
          <ExperienceStep
            experiences={data.experiences}
            onChange={(experiences) => onDataChange({ ...data, experiences })}
          />
        );
      case 4:
        return (
          <EducationStep
            education={data.education}
            onChange={(education) => onDataChange({ ...data, education })}
          />
        );
      case 5:
        return (
          <SkillsStep
            skills={data.skills}
            jobTitle={data.personalInfo.jobTitle}
            onChange={(skills) => onDataChange({ ...data, skills })}
          />
        );
      case 6:
        return (
          <ProjectsStep
            projects={data.projects}
            certifications={data.certifications}
            onProjectsChange={(projects) => onDataChange({ ...data, projects })}
            onCertificationsChange={(certifications) => onDataChange({ ...data, certifications })}
          />
        );
      case 7:
        return (
          <AdditionalStep
            languages={data.languages}
            awards={data.awards}
            references={data.references}
            customSections={data.customSections}
            onLanguagesChange={(languages) => onDataChange({ ...data, languages })}
            onAwardsChange={(awards) => onDataChange({ ...data, awards })}
            onReferencesChange={(references) => onDataChange({ ...data, references })}
            onCustomSectionsChange={(customSections) => onDataChange({ ...data, customSections })}
          />
        );
      case 8:
        return (
          <CustomizeStep
            customization={customization}
            sectionOrder={data.sectionOrder}
            isPremiumUser={isPremiumUser}
            onCustomizationChange={onCustomizationChange}
            onSectionOrderChange={(sectionOrder) => onDataChange({ ...data, sectionOrder })}
            onOpenUpgradeModal={onOpenUpgradeModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Builder Control Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Step indicator label */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-slate-800">
              {WIZARD_STEPS[currentStep - 1]?.title}
            </span>
            <span className="text-xs text-slate-400">/ 8</span>
          </div>

          {/* Quick ATS indicator button */}
          <button
            type="button"
            onClick={onOpenATSChecker}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ATS Score: {atsScore}%
          </button>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1"
            title="Load Alexander's comprehensive executive profile"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sample CV
          </button>

          <button
            type="button"
            onClick={onResetBlank}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 flex items-center gap-1"
            title="Clear and start from scratch"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>

          <button
            type="button"
            onClick={onSaveCV}
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-xs flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          {/* Mobile view switcher tab (Edit Form vs Live Preview) */}
          <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`px-3 py-1 rounded-md transition-all ${
                mobileTab === 'form' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                mobileTab === 'preview' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3 h-3" /> Preview
            </button>
          </div>
        </div>
      </div>

      {/* STEPPER PROGRESS BAR */}
      <div className="hidden sm:grid grid-cols-8 gap-1.5 bg-white p-2 rounded-xl border border-slate-200 text-xs shadow-2xs">
        {WIZARD_STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(step.id)}
              className={`py-2 px-1.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                isCurrent
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : isDone
                  ? 'bg-blue-50/70 text-blue-900 hover:bg-blue-100/60 font-medium'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] truncate max-w-full font-medium">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (8 of 12 on desktop, or visible if mobileTab === 'form') */}
        <div className={`lg:col-span-6 space-y-6 ${mobileTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {renderStepComponent()}

            {/* Previous and Next Navigation Buttons */}
            <div className="pt-8 mt-8 border-t border-slate-200 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
              </button>

              <div className="text-xs text-slate-400 font-medium hidden sm:block">
                Step {currentStep} of {WIZARD_STEPS.length}
              </div>

              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.min(8, s + 1))}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  Next: {WIZARD_STEPS[currentStep]?.title} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSaveCV}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Save Completed CV
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Preview Panel (6 of 12 on desktop, or visible if mobileTab === 'preview') */}
        <div className={`lg:col-span-6 lg:sticky lg:top-20 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <LivePreviewPanel
            data={data}
            customization={customization}
            onCustomizationChange={onCustomizationChange}
            onOpenUpgradeModal={onOpenUpgradeModal}
            isPremiumUser={isPremiumUser}
            lastSavedAt={lastSavedAt}
          />
        </div>
      </div>
    </div>
  );
};
