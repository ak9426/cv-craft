import React from 'react';
import { TEMPLATES } from '../../data/sampleCV';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Layout,
} from 'lucide-react';

interface Props {
  onStartCreating: () => void;
  onExploreTemplates: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onSelectTemplateDirect: (templateId: any) => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartCreating,
  onExploreTemplates,
  onOpenPricing,
  onOpenAuth,
  onSelectTemplateDirect,
}) => {

  return (
    <div className="space-y-24 pb-20 animate-fadeIn">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent -z-10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Next-Gen CV Builder with Gemini AI & ATS Audit</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Build a Professional CV That <span className="text-blue-600 underline decoration-blue-200">Gets You Noticed.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Create recruiter-approved, ATS-friendly resumes in minutes without any design skills. Choose from 12 modern templates, polish bullets with AI, and download instant print-ready PDFs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartCreating}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                Create Your CV Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreTemplates}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-sm shadow-xs flex items-center gap-2 transition-all"
              >
                <Layout className="w-4 h-4 text-slate-600" />
                Explore 12 Templates
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> No signup required to download
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Free basic plan
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Real PDF, PNG & JPG export
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple 3-Step Process</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How CVCraft Works</h2>
          <p className="text-sm text-slate-600">
            From empty page to an interview-ready resume in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Enter Your Information</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use our guided wizard to easily add contact details, work history, education, and skills. Or click "Load Sample" to start with a full executive baseline.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Customize & Enhance with AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pick from 12 designer templates, fine-tune color schemes, and let our Gemini AI assistant turn simple bullet points into quantifiable metrics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Download Instantly</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download your print-ready PDF, high-res PNG, or JPG. Everything is saved locally or securely in your user account for future updates.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TEMPLATE SHOWCASE */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Curated Designs</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-1">12 Professionally Designed Templates</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
                From executive boardrooms to creative design studios, each template is tailored for industry expectations.
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              Browse All 12 Templates <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {TEMPLATES.slice(0, 8).map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplateDirect(tmpl.id)}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                      {tmpl.name}
                    </span>
                    {tmpl.isPremium ? (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        PRO
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{tmpl.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">{tmpl.category}</span>
                  <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">Use →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Land Your Next Dream Opportunity?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Join thousands of job seekers who created high-impact, recruiter-approved resumes with CVCraft today.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartCreating}
            className="px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 font-black rounded-xl text-sm shadow-xl inline-flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
          >
            Create Your CV Now — Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 border-t border-slate-200 text-xs text-slate-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 font-black text-slate-900 text-base">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                CV
              </span>
              CVCraft
            </div>
            <p className="text-xs text-slate-500">
              "Your Career. Your Story. Your Next Opportunity."
            </p>
            <div className="text-[11px] text-slate-400">© 2026 CVCraft Platform. All rights reserved.</div>
          </div>

          <div>
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">Templates</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onExploreTemplates} className="hover:text-blue-600">Modern Professional</button></li>
              <li><button onClick={onExploreTemplates} className="hover:text-blue-600">Executive Leader</button></li>
              <li><button onClick={onExploreTemplates} className="hover:text-blue-600">ATS Clean Scan</button></li>
              <li><button onClick={onExploreTemplates} className="hover:text-blue-600">Creative Studio</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">Product & Tools</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onStartCreating} className="hover:text-blue-600">CV Builder Wizard</button></li>
              <li><button onClick={onExploreTemplates} className="hover:text-blue-600">CV Templates</button></li>
              <li><button onClick={onStartCreating} className="hover:text-blue-600">ATS Keyword Checker</button></li>
              <li><button onClick={onStartCreating} className="hover:text-blue-600">Gemini AI Assistant</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">Support & Privacy</div>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer">Security Safeguards</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer">support@cvcraft.io</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
