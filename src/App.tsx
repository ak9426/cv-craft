import React, { useState, useEffect } from 'react';
import { CVData, CVCustomization, SavedCV, UserAccount, TemplateId } from './types/cv';
import { SAMPLE_CV, BLANK_CV, DEFAULT_CUSTOMIZATION, TEMPLATES } from './data/sampleCV';
import { Navbar, ActiveTab } from './components/navigation/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { CVBuilderWorkspace } from './components/builder/CVBuilderWorkspace';
import { TemplateGallery } from './components/gallery/TemplateGallery';
import { ATSCheckerSuite } from './components/ats/ATSCheckerSuite';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/modals/AuthModal';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { fireSuccessConfetti } from './utils/exportCV';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

const LOCAL_STORAGE_CV_KEY = 'cvcraft_current_cv_v1';
const LOCAL_STORAGE_CUSTOM_KEY = 'cvcraft_current_custom_v1';
const LOCAL_STORAGE_SAVED_LIST_KEY = 'cvcraft_saved_list_v1';
const LOCAL_STORAGE_USER_KEY = 'cvcraft_user_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CV_KEY);
      const parsed = stored ? JSON.parse(stored) : SAMPLE_CV;
      return {
        ...parsed,
        personalInfo: {
          ...parsed.personalInfo,
          photoUrl: '',
          showPhoto: false,
        },
      };
    } catch {
      return SAMPLE_CV;
    }
  });

  const [customization, setCustomization] = useState<CVCustomization>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CUSTOMIZATION;
    } catch {
      return DEFAULT_CUSTOMIZATION;
    }
  });

  const [savedCVs, setSavedCVs] = useState<SavedCV[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SAVED_LIST_KEY);
      if (stored) return JSON.parse(stored);
      // Seed with initial sample document
      return [
        {
          id: 'cv-initial-sample',
          title: 'Senior Software Architect - Alexander Vance',
          updatedAt: 'Just now',
          createdAt: new Date().toISOString(),
          data: SAMPLE_CV,
          customization: DEFAULT_CUSTOMIZATION,
        },
      ];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('just now');

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CV_KEY, JSON.stringify(cvData));
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(customization));
      const now = new Date();
      setLastSavedTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      );
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [cvData, customization]);

  // Persist saved list
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_LIST_KEY, JSON.stringify(savedCVs));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [savedCVs]);

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Actions
  const handleLoadSample = () => {
    setCvData(SAMPLE_CV);
    setCustomization(DEFAULT_CUSTOMIZATION);
    showToast('Loaded Alexander Vance professional sample profile!');
    if (activeTab === 'home') {
      setActiveTab('builder');
    }
  };

  const handleResetBlank = () => {
    if (window.confirm('Clear all fields and start a blank resume?')) {
      setCvData(BLANK_CV);
      showToast('Form cleared.');
    }
  };

  const handleSaveDraft = () => {
    const title = `${cvData.personalInfo.fullName || 'Untitled'} - ${cvData.personalInfo.jobTitle || 'Resume'}`;
    const newSaved: SavedCV = {
      id: `cv-${Date.now()}`,
      title,
      updatedAt: 'Just now',
      createdAt: new Date().toISOString(),
      data: cvData,
      customization,
    };
    setSavedCVs([newSaved, ...savedCVs.filter((c) => c.title !== title)]);
    showToast('Resume draft saved successfully!');
    fireSuccessConfetti();
  };

  const handleOpenSavedCV = (id: string) => {
    const target = savedCVs.find((c) => c.id === id);
    if (target) {
      setCvData(target.data);
      setCustomization(target.customization);
      setActiveTab('builder');
      showToast(`Loaded "${target.title}"`);
    }
  };

  const handleDuplicateCV = (id: string) => {
    const target = savedCVs.find((c) => c.id === id);
    if (target) {
      const copy: SavedCV = {
        ...target,
        id: `cv-${Date.now()}`,
        title: `${target.title} (Copy)`,
        updatedAt: 'Just now',
        createdAt: new Date().toISOString(),
      };
      setSavedCVs([copy, ...savedCVs]);
      showToast(`Duplicated "${target.title}"`);
    }
  };

  const handleDeleteCV = (id: string) => {
    setSavedCVs(savedCVs.filter((c) => c.id !== id));
    showToast('CV deleted.');
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setCustomization((prev) => ({
        ...prev,
        templateId,
        primaryColor: tmpl.colorPreset.primary,
        accentColor: tmpl.colorPreset.accent,
        fontFamily: tmpl.fontPreset,
      }));
      showToast(`Template updated to "${tmpl.name}"`);
      setActiveTab('builder');
    }
  };

  const handleApplyATSTemplate = () => {
    handleSelectTemplate('ats-friendly');
    showToast('Applied 100% linear ATS Clean Scan template!');
  };

  const handleUpgradeSuccess = (plan: 'Pro Monthly' | 'Pro Annual') => {
    if (user) {
      setUser({ ...user, isPremium: true, plan });
    } else {
      setUser({
        id: `usr-${Date.now()}`,
        email: 'alex.vance@example.com',
        name: 'Alexander Vance',
        isPremium: true,
        plan,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
    }
    showToast(`Welcome to CVCraft ${plan}! All 12 Pro templates unlocked.`);
  };

  const isPremiumUser = Boolean(user?.isPremium);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-scaleUp border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setUser(null);
          showToast('Signed out successfully.');
        }}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        onLoadSample={handleLoadSample}
      />

      {/* Body Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onStartCreating={() => setActiveTab('builder')}
            onExploreTemplates={() => setActiveTab('templates')}
            onOpenPricing={() => setIsUpgradeModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSelectTemplateDirect={(tmplId) => handleSelectTemplate(tmplId)}
          />
        )}

        {activeTab === 'builder' && (
          <CVBuilderWorkspace
            data={cvData}
            customization={customization}
            isPremiumUser={isPremiumUser}
            onDataChange={setCvData}
            onCustomizationChange={(c) => setCustomization((prev) => ({ ...prev, ...c }))}
            onSaveCV={handleSaveDraft}
            onLoadSample={handleLoadSample}
            onResetBlank={handleResetBlank}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
            onOpenATSChecker={() => setActiveTab('ats')}
            lastSavedAt={lastSavedTime}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateGallery
            currentTemplateId={customization.templateId}
            isPremiumUser={isPremiumUser}
            onSelectTemplate={handleSelectTemplate}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {activeTab === 'ats' && (
          <ATSCheckerSuite
            data={cvData}
            customization={customization}
            onApplyATSTemplate={handleApplyATSTemplate}
          />
        )}

        {activeTab === 'pricing' && (
          <div className="py-12">
            <UpgradeModal
              isOpen={true}
              onClose={() => setActiveTab('home')}
              onUpgradeSuccess={handleUpgradeSuccess}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            user={user}
            savedCVs={savedCVs}
            onOpenCV={handleOpenSavedCV}
            onDuplicateCV={handleDuplicateCV}
            onDeleteCV={handleDeleteCV}
            onCreateNewCV={() => {
              setCvData(BLANK_CV);
              setActiveTab('builder');
              showToast('Started new blank resume.');
            }}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => {
          setUser(u);
          showToast(`Signed in as ${u.name}`);
        }}
      />

      {activeTab !== 'pricing' && (
        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
        />
      )}
    </div>
  );
}
