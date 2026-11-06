import React, { ChangeEvent } from 'react';
import { PersonalInfo } from '../../types/cv';
import { User, Mail, Phone, Globe, Linkedin, MapPin, Calendar, Camera, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
  info: PersonalInfo;
  onChange: (updated: Partial<PersonalInfo>) => void;
}

export const PersonalInfoStep: React.FC<Props> = ({ info, onChange }) => {
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
        <p className="text-sm text-slate-500">
          Enter your contact details and professional title. This appears at the top of your resume.
        </p>
      </div>

      {/* Photo Upload & Visibility */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-6">
        <div className="relative group">
          {info.photoUrl ? (
            <img
              src={info.photoUrl}
              alt="Profile"
              className={`w-20 h-20 object-cover border-2 border-blue-500 shadow-sm ${
                info.photoShape === 'circle' ? 'rounded-full' : info.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'
              }`}
            />
          ) : (
            <div className="w-20 h-20 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 border border-dashed border-slate-300">
              <User className="w-8 h-8" />
            </div>
          )}

          <label className="absolute inset-0 bg-black/40 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-medium">
            <Camera className="w-4 h-4 mr-1" /> Change
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>

        <div className="space-y-2 flex-1 min-w-[220px]">
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={info.showPhoto}
                onChange={(e) => onChange({ showPhoto: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              Show Photo on Resume
            </label>

            {info.photoUrl && (
              <button
                type="button"
                onClick={() => onChange({ photoUrl: '' })}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Photo
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="font-medium">Shape:</span>
            {(['circle', 'rounded', 'square'] as const).map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => onChange({ photoShape: shape })}
                className={`px-2.5 py-1 rounded capitalize border transition-all ${
                  info.photoShape === shape
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">Accepted: JPG, PNG, WebP (Max 5MB)</p>
        </div>
      </div>

      {/* Primary Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="e.g. Alexander Vance"
              value={info.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Professional Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Full-Stack Architect"
            value={info.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              placeholder="alex@example.com"
              value={info.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              placeholder="+1 (555) 019-2834"
              value={info.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            City & State / Province
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="San Francisco, CA"
              value={info.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Country
          </label>
          <input
            type="text"
            placeholder="United States"
            value={info.country}
            onChange={(e) => onChange({ country: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            LinkedIn Profile URL
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="linkedin.com/in/username"
              value={info.linkedin}
              onChange={(e) => onChange({ linkedin: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Personal Website or Portfolio
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="url"
              placeholder="https://yourportfolio.com"
              value={info.website}
              onChange={(e) => onChange({ website: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nationality (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. American / Canadian"
            value={info.nationality || ''}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Date of Birth (Optional)
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="date"
              value={info.dateOfBirth || ''}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
