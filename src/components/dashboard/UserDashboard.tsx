import React, { useState } from 'react';
import { SavedCV, UserAccount } from '../../types/cv';
import { TEMPLATES } from '../../data/sampleCV';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Download,
  Edit3,
  Calendar,
  Sparkles,
  Search,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface Props {
  user: UserAccount | null;
  savedCVs: SavedCV[];
  onOpenCV: (id: string) => void;
  onDuplicateCV: (id: string) => void;
  onDeleteCV: (id: string) => void;
  onCreateNewCV: () => void;
  onOpenUpgradeModal: () => void;
}

export const UserDashboard: React.FC<Props> = ({
  user,
  savedCVs,
  onOpenCV,
  onDuplicateCV,
  onDeleteCV,
  onCreateNewCV,
  onOpenUpgradeModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCVs = savedCVs.filter(
    (cv) =>
      cv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.data.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.data.personalInfo.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            {user?.isPremium && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600" /> PRO PLAN
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Manage your saved resumes, duplicate variations for different positions, and track downloads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!user?.isPremium && (
            <button
              type="button"
              onClick={onOpenUpgradeModal}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-xs font-bold hover:from-amber-600 hover:to-amber-700 shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Upgrade to Pro
            </button>
          )}

          <button
            type="button"
            onClick={onCreateNewCV}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Create New CV
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-medium text-slate-500">Total Saved CVs</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{savedCVs.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-medium text-slate-500">Account Status</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{user?.plan || 'Free'}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-medium text-slate-500">Available Templates</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">12 Designs</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-medium text-slate-500">Cloud Autosave</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle className="w-5 h-5" /> Active
          </div>
        </div>
      </div>

      {/* CV List Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Your Resume Documents ({filteredCVs.length})
          </h2>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by title or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {filteredCVs.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white border border-dashed border-slate-200 rounded-2xl">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No resumes found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {searchQuery ? 'Try clearing your search query.' : 'Get started by creating your first professional CV now.'}
            </p>
            <button
              type="button"
              onClick={onCreateNewCV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
            >
              Start New Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCVs.map((cv) => {
              const tmpl = TEMPLATES.find((t) => t.id === cv.customization.templateId);
              return (
                <div
                  key={cv.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {tmpl?.name || 'Modern'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {cv.updatedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cv.title}
                    </h3>

                    <p className="text-xs text-slate-600">
                      {cv.data.personalInfo.fullName || 'No Name'} • {cv.data.personalInfo.jobTitle || 'No Title'}
                    </p>

                    <div className="text-[11px] text-slate-400">
                      {cv.data.experiences.length} Experiences • {cv.data.skills.length} Skills • {cv.data.education.length} Degrees
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenCV(cv.id)}
                      className="flex-1 py-1.5 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit & Export
                    </button>

                    <button
                      type="button"
                      onClick={() => onDuplicateCV(cv.id)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                      title="Duplicate CV"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteCV(cv.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      title="Delete CV"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
