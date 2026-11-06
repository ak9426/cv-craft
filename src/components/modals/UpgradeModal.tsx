import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, ShieldCheck, Tag, CreditCard } from 'lucide-react';
import { fireSuccessConfetti } from '../../utils/exportCV';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: (plan: 'Pro Monthly' | 'Pro Annual') => void;
}

export const UpgradeModal: React.FC<Props> = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'CAREER2026' || couponCode.trim().toUpperCase() === 'PRO50') {
      setDiscountApplied(true);
    }
  };

  const handleSimulateUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      fireSuccessConfetti();
      onUpgradeSuccess(billingCycle === 'annual' ? 'Pro Annual' : 'Pro Monthly');
      onClose();
    }, 700);
  };

  const monthlyPrice = discountApplied ? 6.00 : 12.00;
  const annualPrice = discountApplied ? 49.00 : 89.00;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-scaleUp">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Unlock CVCraft Professional
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Accelerate Your Job Search With Elite Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Get unrestricted access to all 12 templates, AI writing copilot, high-res exports, and ATS audit tools.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl mt-3 text-xs font-bold">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Annual Billing
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-black">
                SAVE 38%
              </span>
            </button>
          </div>
        </div>

        {/* Feature Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* FREE PLAN */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Free Tier</span>
              <span className="text-lg font-black text-slate-900">$0</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Access to standard templates
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Standard PDF download
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Basic customization
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="w-3.5 h-3.5 text-center leading-none text-slate-300">✕</span> Limited AI assistance
              </li>
            </ul>
          </div>

          {/* PRO PLAN */}
          <div className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50/30 space-y-3 relative shadow-md">
            <div className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
              Recommended
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-900">CVCraft Pro</span>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">
                  ${billingCycle === 'annual' ? annualPrice : monthlyPrice}
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  /{billingCycle === 'annual' ? 'year' : 'mo'}
                </span>
              </div>
            </div>

            <ul className="text-xs text-slate-800 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" /> All 12 Pro Templates & layouts
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" /> Gemini AI summary & bullet writer
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" /> High-DPI PNG, JPG & PDF downloads
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" /> Unlimited saved CV versions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" /> Advanced ATS optimization suite
              </li>
            </ul>
          </div>
        </div>

        {/* Coupon code */}
        <div className="mb-5 flex gap-2">
          <input
            type="text"
            placeholder="Coupon code (e.g. CAREER2026)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono tracking-wider focus:bg-white"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
          >
            Apply Code
          </button>
        </div>

        {discountApplied && (
          <div className="mb-4 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 font-semibold">
            <Tag className="w-3.5 h-3.5" /> 50% discount voucher applied successfully!
          </div>
        )}

        {/* Upgrade Action Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handleSimulateUpgrade}
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          {isProcessing ? 'Activating Pro Subscription...' : 'Upgrade Now & Unlock All Features'}
        </button>

        <p className="text-[11px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> 14-day money-back guarantee. Cancel anytime with 1 click.
        </p>
      </div>
    </div>
  );
};
