import React, { useState } from 'react';
import { TEMPLATES } from '../../data/sampleCV';
import { TemplateMeta } from '../../types/cv';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  ToggleLeft,
  ToggleRight,
  Search,
  CheckCircle,
  BarChart3,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'Free' | 'Pro Monthly' | 'Pro Annual';
  cvCount: number;
  joined: string;
}

const INITIAL_USERS: MockUser[] = [
  { id: 'u1', name: 'Alexander Vance', email: 'alex@example.com', role: 'admin', plan: 'Pro Annual', cvCount: 3, joined: '2026-01-15' },
  { id: 'u2', name: 'Sophia Miller', email: 'sophia.m@example.com', role: 'user', plan: 'Pro Monthly', cvCount: 2, joined: '2026-02-10' },
  { id: 'u3', name: 'David Zhang', email: 'dzhang@example.com', role: 'user', plan: 'Free', cvCount: 1, joined: '2026-03-01' },
  { id: 'u4', name: 'Elena Rostova', email: 'elena@example.com', role: 'user', plan: 'Pro Monthly', cvCount: 4, joined: '2026-03-22' },
  { id: 'u5', name: 'Marcus Brody', email: 'marcus@example.com', role: 'user', plan: 'Free', cvCount: 1, joined: '2026-04-05' },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'templates' | 'users' | 'pricing'>('analytics');
  const [templatesList, setTemplatesList] = useState<TemplateMeta[]>(TEMPLATES);
  const [usersList, setUsersList] = useState<MockUser[]>(INITIAL_USERS);
  const [monthlyPrice, setMonthlyPrice] = useState('12.00');
  const [annualPrice, setAnnualPrice] = useState('89.00');
  const [userSearch, setUserSearch] = useState('');

  const toggleTemplatePremium = (id: string) => {
    setTemplatesList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPremium: !t.isPremium } : t))
    );
  };

  const toggleUserRole = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Admin Title */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> Administrative Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">CVCraft Platform Administration</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Platform performance metrics, user access controls, template monetization, and pricing engine.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
          {(['analytics', 'templates', 'users', 'pricing'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ANALYTICS VIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                <span>Total Registered Users</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">14,820</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                <span>Total CVs Created</span>
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">48,930</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +24.1% this month
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                <span>Active Pro Subscriptions</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">3,410</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.8% conversion
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                <span>Monthly Recurring Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">$42,890</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +15.2% ARR growth
              </div>
            </div>
          </div>

          {/* Activity Logs & Chart Mock */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" /> Real-Time CV Exports (Past 24 Hours)
            </h3>
            <div className="h-44 flex items-end gap-2 pt-6 px-2 border-b border-slate-100">
              {[42, 65, 88, 54, 76, 92, 110, 84, 96, 120, 145, 138, 160, 142, 175, 190, 165, 185, 210, 195, 220, 240, 215, 260].map(
                (val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      style={{ height: `${(val / 260) * 120}px` }}
                      className="w-full bg-blue-600 rounded-t group-hover:bg-blue-700 transition-colors relative"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded pointer-events-none">
                        {val}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>00:00 UTC</span>
              <span>12:00 UTC</span>
              <span>Now (Live)</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEMPLATE MANAGEMENT */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Template Monetization & Catalog</h3>
            <p className="text-xs text-slate-500">Toggle templates between Free tier and Pro subscription tiers.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {templatesList.map((tmpl) => (
              <div key={tmpl.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{tmpl.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({tmpl.category})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xl">{tmpl.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      tmpl.isPremium
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {tmpl.isPremium ? 'PRO ONLY' : 'FREE'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleTemplatePremium(tmpl.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    Toggle to {tmpl.isPremium ? 'Free' : 'Pro'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">User Accounts & RBAC Roles</h3>
              <p className="text-xs text-slate-500">Promote users to Administrator or inspect subscription status.</p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Resumes</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList
                  .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/60">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-slate-500 font-mono text-[11px]">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-700">{u.plan}</span>
                      </td>
                      <td className="p-3 font-mono">{u.cvCount}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleUserRole(u.id)}
                          className="text-xs text-blue-600 font-bold hover:underline"
                        >
                          Make {u.role === 'admin' ? 'User' : 'Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. PRICING & PAYMENT GATEWAY MANAGEMENT */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" /> Subscription Pricing & Payment Gateway Configuration
            </h3>
            <p className="text-xs text-slate-500">
              Configure subscription tiers. CVCraft supports ready integration hooks for Stripe, LemonSqueezy, and Paddle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700">Pro Monthly Plan</div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="text"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• All 12 Pro Templates</li>
                <li>• Gemini AI Writing Assistant</li>
                <li>• High-resolution PNG & JPG export</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700">Pro Annual Plan</div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="text"
                    value={annualPrice}
                    onChange={(e) => setAnnualPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Everything in Monthly</li>
                <li>• Save 38% annually</li>
                <li>• Priority ATS optimization engine</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
            <strong>Payment Provider Connectivity:</strong>
            <p>
              Webhook dispatchers and checkout sessions are decoupled. You can connect a live Stripe Secret Key or Paddle Vendor ID via environment variables when ready for live credit card processing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
