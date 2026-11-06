import React, { useState } from 'react';
import { UserAccount } from '../../types/cv';
import {
  FileText,
  Layout,
  ShieldCheck,
  CreditCard,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  Sparkles,
  Layers,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';

export type ActiveTab = 'home' | 'builder' | 'templates' | 'ats' | 'pricing' | 'dashboard' | 'admin';

interface Props {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenUpgradeModal: () => void;
  onLoadSample: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
  onOpenUpgradeModal,
  onLoadSample,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string; icon?: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'builder', label: 'Create CV', icon: <FileText className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'templates', label: 'Templates (12)' },
    { id: 'ats', label: 'ATS Checker' },
    { id: 'dashboard', label: 'My CVs', icon: <FolderOpen className="w-3.5 h-3.5 text-slate-500" /> },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            CV
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-slate-900 text-lg tracking-tight leading-none">
              CVCraft
              <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                PRO
              </span>
            </div>
            <div className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-tight">
              Your Career. Your Story.
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleTabClick(link.id)}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            );
          })}

          {/* Admin link visible for admin role or quick preview */}
          {user?.role === 'admin' && (
            <button
              type="button"
              onClick={() => handleTabClick('admin')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'text-purple-600 bg-purple-50 font-bold'
                  : 'hover:text-purple-700 hover:bg-purple-50 text-slate-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" /> Admin
            </button>
          )}
        </nav>

        {/* Right CTA / User Section */}
        <div className="flex items-center gap-2">
          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-scaleUp">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">{user.email}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <Sparkles className="w-3 h-3 text-amber-500" /> {user.plan}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleTabClick('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <FolderOpen className="w-3.5 h-3.5" /> My Saved CVs
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleTabClick('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-600" /> Admin Console
                  </button>

                  {!user.isPremium && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenUpgradeModal();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Upgrade to Pro
                    </button>
                  )}

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 text-xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleTabClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                activeTab === link.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleTabClick('admin')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 text-purple-700 hover:bg-purple-50"
          >
            <Shield className="w-3.5 h-3.5" /> Admin Dashboard
          </button>

          <button
            type="button"
            onClick={() => {
              onLoadSample();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 text-amber-700 hover:bg-amber-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Load Alexander's Sample CV
          </button>
        </div>
      )}
    </header>
  );
};
