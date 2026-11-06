import React from 'react';
import { CVData, CVCustomization, SectionKey } from '../../types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  Languages,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

interface CVRendererProps {
  data: CVData;
  customization: CVCustomization;
  scale?: number;
}

export const CVRenderer: React.FC<CVRendererProps> = ({ data, customization }) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages, awards, references, customSections, sectionOrder } = data;
  const { templateId, fontFamily, fontSize, primaryColor, accentColor, sectionSpacing, paperSize, textAlign } = customization;

  // Font family inline style mapping
  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'Merriweather':
        return { fontFamily: "'Merriweather', serif" };
      case 'Playfair Display':
        return { fontFamily: "'Playfair Display', serif" };
      case 'Montserrat':
        return { fontFamily: "'Montserrat', sans-serif" };
      case 'Outfit':
        return { fontFamily: "'Outfit', sans-serif" };
      case 'Fira Code':
        return { fontFamily: "'Fira Code', monospace" };
      case 'Roboto':
        return { fontFamily: "'Roboto', sans-serif" };
      case 'Inter':
      default:
        return { fontFamily: "'Inter', sans-serif" };
    }
  };

  // Base font size classes
  const fontSizes = {
    sm: { base: 'text-[12px] leading-relaxed', name: 'text-2xl', title: 'text-sm', heading: 'text-sm', sub: 'text-[11px]' },
    md: { base: 'text-[13px] leading-relaxed', name: 'text-3xl', title: 'text-base', heading: 'text-base', sub: 'text-xs' },
    lg: { base: 'text-[14px] leading-relaxed', name: 'text-4xl', title: 'text-lg', heading: 'text-lg', sub: 'text-xs' },
  }[fontSize];

  // Spacing styling
  const spacingStyles = {
    compact: 'space-y-3.5',
    normal: 'space-y-5',
    spacious: 'space-y-7',
  }[sectionSpacing];

  const itemSpacing = {
    compact: 'space-y-2',
    normal: 'space-y-3',
    spacious: 'space-y-4',
  }[sectionSpacing];

  const photoRadiusClass = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-2xl',
  }[personalInfo.photoShape || 'rounded'];

  // Dimensions
  const paperDimensionsClass = paperSize === 'a4' ? 'min-h-[1120px] w-full max-w-[800px]' : 'min-h-[1056px] w-full max-w-[816px]';

  // Helper for bullet list
  const renderBullets = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    return (
      <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
        {lines.map((line, idx) => (
          <li key={idx} className="pl-1">
            {line.replace(/^[•\-\*]\s*/, '')}
          </li>
        ))}
      </ul>
    );
  };

  // Standard Sections Builder
  const renderSectionContent = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <UserCheck className="w-4 h-4 opacity-80" /> Professional Summary
            </h3>
            <p className={`text-slate-700 ${textAlign === 'justify' ? 'text-justify' : 'text-left'}`}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (!experiences || experiences.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Briefcase className="w-4 h-4 opacity-80" /> Work Experience
            </h3>
            <div className={itemSpacing}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex flex-wrap justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-900 text-sm">{exp.jobTitle}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded text-slate-600 bg-slate-100">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-600 mb-1.5 font-medium">
                    <span style={{ color: primaryColor }} className="font-semibold">{exp.company}</span>
                    {exp.location && <span>• {exp.location}</span>}
                    {exp.employmentType && <span>• {exp.employmentType}</span>}
                  </div>
                  {renderBullets(exp.responsibilities)}
                  {exp.keyAchievements && (
                    <div className="mt-1.5 p-2 bg-slate-50 border-l-2 text-xs text-slate-700 italic rounded-r" style={{ borderColor: accentColor }}>
                      <span className="font-semibold not-italic text-slate-900">Key Milestone: </span>
                      {exp.keyAchievements}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <BookOpen className="w-4 h-4 opacity-80" /> Education
            </h3>
            <div className={itemSpacing}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {edu.degree} {edu.major ? `in ${edu.major}` : ''}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">{edu.institution}</div>
                    {edu.gpa && <div className="text-xs text-slate-500 mt-0.5">GPA: {edu.gpa}</div>}
                    {edu.additionalInfo && <div className="text-xs text-slate-600 mt-1">{edu.additionalInfo}</div>}
                  </div>
                  <div className="text-xs font-medium text-slate-500 whitespace-nowrap">
                    {edu.startYear} – {edu.graduationYear}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Code2 className="w-4 h-4 opacity-80" /> Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all"
                  style={{
                    backgroundColor: `${primaryColor}0a`,
                    borderColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {skill.name}
                  {skill.levelLabel && <span className="opacity-60 text-[10px]">({skill.levelLabel})</span>}
                </span>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Code2 className="w-4 h-4 opacity-80" /> Key Projects
            </h3>
            <div className={itemSpacing}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      {proj.name}
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      )}
                    </span>
                    {proj.role && <span className="text-xs font-semibold text-slate-500">{proj.role}</span>}
                  </div>
                  <p className="text-xs text-slate-700 mt-1">{proj.description}</p>
                  {proj.technologies && (
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">Tech:</span> {proj.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <CheckCircle2 className="w-4 h-4 opacity-80" /> Certifications & Licenses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-slate-600 text-[11px] flex justify-between mt-0.5">
                    <span>{cert.issuer}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                  {cert.credentialId && <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {cert.credentialId}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Languages className="w-4 h-4 opacity-80" /> Languages
            </h3>
            <div className="flex flex-wrap gap-4 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">{lang.name}:</span>
                  <span className="text-slate-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Award className="w-4 h-4 opacity-80" /> Honors & Awards
            </h3>
            <div className={itemSpacing}>
              {awards.map((award) => (
                <div key={award.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{award.title}</span>
                    <span className="text-slate-500 font-normal">{award.year}</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">{award.issuer}</div>
                  {award.description && <p className="text-slate-600 mt-0.5">{award.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'references':
        if (!references || references.length === 0) return null;
        return (
          <div className="section-block">
            <h3
              className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2 flex items-center gap-2 border-b pb-1`}
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <UserCheck className="w-4 h-4 opacity-80" /> References
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {references.map((ref) => (
                <div key={ref.id} className="border-l-2 pl-2.5 py-1" style={{ borderColor: primaryColor }}>
                  <div className="font-bold text-slate-900">{ref.name}</div>
                  <div className="text-slate-600 text-[11px]">{ref.jobTitle} • {ref.company}</div>
                  <div className="text-slate-500 text-[11px]">{ref.email} {ref.phone ? `• ${ref.phone}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'custom':
        if (!customSections || customSections.length === 0) return null;
        return (
          <div className="space-y-4">
            {customSections.map((sec) => (
              <div key={sec.id} className="section-block">
                <h3
                  className={`${fontSizes.heading} font-bold uppercase tracking-wider mb-2 border-b pb-1`}
                  style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
                >
                  {sec.heading}
                </h3>
                <div className={itemSpacing}>
                  {sec.items.map((item) => (
                    <div key={item.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{item.title}</span>
                        {item.date && <span className="text-slate-500 font-normal">{item.date}</span>}
                      </div>
                      {item.subtitle && <div className="text-slate-600 text-[11px] italic">{item.subtitle}</div>}
                      <p className="text-slate-700 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  /* ========================================================================= */
  /* TEMPLATE SPECIFIC RENDERERS                                               */
  /* ========================================================================= */

  // 1. Modern Professional (Default 2-Column Sidebar + Clean Header)
  if (templateId === 'modern-professional') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-slate-800 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} relative overflow-hidden`}
        style={getFontFamilyStyle()}
      >
        {/* Top Header Banner */}
        <div className="p-8 text-white flex items-center justify-between gap-6" style={{ backgroundColor: primaryColor }}>
          <div className="flex-1">
            <h1 className={`${fontSizes.name} font-extrabold tracking-tight`}>{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className={`${fontSizes.title} font-medium mt-1 tracking-wide`} style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Your Professional Title'}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs opacity-90 font-light">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>
              )}
              {(personalInfo.city || personalInfo.country) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedin}</span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{personalInfo.website}</span>
              )}
            </div>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`w-28 h-28 object-cover border-4 border-white/30 shadow-md ${photoRadiusClass}`}
            />
          )}
        </div>

        {/* Content Body */}
        <div className={`p-8 ${spacingStyles}`}>
          {sectionOrder.map((key) => (
            <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 2. Classic Corporate (Centered Executive Header, Traditional Dividers)
  if (templateId === 'classic-corporate') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-slate-900 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} p-10`}
        style={getFontFamilyStyle()}
      >
        <div className="text-center pb-6 border-b-2 border-slate-900">
          <h1 className={`${fontSizes.name} font-bold tracking-normal uppercase text-slate-950`}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className={`${fontSizes.title} font-serif italic text-slate-700 mt-1`}>
            {personalInfo.jobTitle || 'Your Professional Title'}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-serif">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {(personalInfo.city || personalInfo.country) && (
              <span>• {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
            )}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>

        <div className={`pt-6 ${spacingStyles}`}>
          {sectionOrder.map((key) => (
            <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 3. Minimalist (Clean Single Column, Generous Whitespace, Subtle Accents)
  if (templateId === 'minimalist') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-zinc-900 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} p-10`}
        style={getFontFamilyStyle()}
      >
        <div className="mb-8">
          <h1 className={`${fontSizes.name} font-light tracking-tight text-zinc-950`}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className={`${fontSizes.title} text-zinc-500 font-normal mt-0.5 tracking-wide`}>
            {personalInfo.jobTitle || 'Your Professional Title'}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 mt-2 font-mono">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
            {personalInfo.city && <span>/ {personalInfo.city}</span>}
            {personalInfo.linkedin && <span>/ {personalInfo.linkedin}</span>}
          </div>
        </div>

        <div className={spacingStyles}>
          {sectionOrder.map((key) => (
            <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 4. Creative (Vibrant Accent Sidebar & Modern Pills)
  if (templateId === 'creative') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-slate-800 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} flex overflow-hidden`}
        style={getFontFamilyStyle()}
      >
        {/* Left Colorful Accent Strip */}
        <div className="w-1/3 p-6 text-white flex flex-col justify-between" style={{ backgroundColor: primaryColor }}>
          <div>
            {personalInfo.showPhoto && personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={`w-28 h-28 object-cover mx-auto mb-6 border-4 border-white shadow-lg ${photoRadiusClass}`}
              />
            )}
            <h1 className="text-2xl font-black text-center">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-xs font-semibold text-center mt-1 uppercase tracking-wider" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Creative Role'}
            </p>

            <div className="mt-8 space-y-3 text-xs opacity-90">
              <div className="font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-white/20">Contact</div>
              {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
              {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
              {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
            </div>

            {skills.length > 0 && (
              <div className="mt-8">
                <div className="font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-white/20 mb-3">Core Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s.id} className="px-2 py-0.5 rounded-full text-[11px] bg-white/20 text-white font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-[10px] opacity-60 text-center pt-6">CVCraft Creative Edition</div>
        </div>

        {/* Right Main Column */}
        <div className={`w-2/3 p-8 ${spacingStyles}`}>
          {sectionOrder
            .filter((k) => k !== 'skills') // Skills shown in left sidebar
            .map((key) => (
              <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
            ))}
        </div>
      </div>
    );
  }

  // 5. Executive (Navy & Gold Accent, Leadership Highlight Bar)
  if (templateId === 'executive') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-slate-900 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} p-8`}
        style={getFontFamilyStyle()}
      >
        <div className="border-b-4 pb-6" style={{ borderColor: primaryColor }}>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accentColor }}>Executive Profile</span>
              <h1 className={`${fontSizes.name} font-black text-slate-900 tracking-tight`}>{personalInfo.fullName || 'Executive Candidate'}</h1>
              <p className={`${fontSizes.title} font-medium text-slate-700 mt-1`}>{personalInfo.jobTitle}</p>
            </div>
            {personalInfo.showPhoto && personalInfo.photoUrl && (
              <img src={personalInfo.photoUrl} alt="Executive" className={`w-24 h-24 object-cover border-2 shadow ${photoRadiusClass}`} />
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
            <div><span className="font-bold text-slate-800">Email:</span> {personalInfo.email}</div>
            <div><span className="font-bold text-slate-800">Phone:</span> {personalInfo.phone}</div>
            <div><span className="font-bold text-slate-800">Location:</span> {personalInfo.city}</div>
            <div><span className="font-bold text-slate-800">LinkedIn:</span> {personalInfo.linkedin}</div>
          </div>
        </div>

        <div className={`pt-6 ${spacingStyles}`}>
          {sectionOrder.map((key) => (
            <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 10. ATS-Friendly (100% Linear Semantic Clean Structure)
  if (templateId === 'ats-friendly') {
    return (
      <div
        id="cv-document-sheet"
        className={`bg-white text-black shadow-2xl mx-auto ${paperDimensionsClass} text-xs leading-normal p-10 font-sans`}
      >
        <div className="text-center mb-6 border-b border-black pb-4">
          <h1 className="text-2xl font-bold tracking-wide uppercase text-black">{personalInfo.fullName || 'FULL NAME'}</h1>
          <p className="text-sm font-semibold text-gray-800 mt-1 uppercase">{personalInfo.jobTitle || 'TARGET ROLE'}</p>
          <div className="text-[11px] text-gray-700 mt-2 space-x-2">
            <span>{personalInfo.email}</span>
            <span>|</span>
            <span>{personalInfo.phone}</span>
            <span>|</span>
            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
            {personalInfo.linkedin && (
              <>
                <span>|</span>
                <span>{personalInfo.linkedin}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {sectionOrder.map((key) => (
            <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 6 - 12: Generic Enhanced Themed Wrapper for Remaining Templates (Academic, Student, Fresh Grad, Experienced Pro, International, Elegant)
  return (
    <div
      id="cv-document-sheet"
      className={`bg-white text-slate-900 shadow-2xl mx-auto ${paperDimensionsClass} ${fontSizes.base} p-8 relative overflow-hidden`}
      style={getFontFamilyStyle()}
    >
      {/* Decorative top border bar */}
      <div className="h-2.5 w-full absolute top-0 left-0" style={{ backgroundColor: primaryColor }} />

      {/* Header */}
      <div className="flex justify-between items-start pb-6 border-b border-slate-200 mt-2">
        <div>
          <h1 className={`${fontSizes.name} font-bold tracking-tight`} style={{ color: primaryColor }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className={`${fontSizes.title} font-medium mt-1`} style={{ color: accentColor }}>
            {personalInfo.jobTitle || 'Your Professional Title'}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-medium">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
            {personalInfo.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.city}, {personalInfo.country}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
            {personalInfo.nationality && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />Nationality: {personalInfo.nationality}</span>}
          </div>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className={`w-24 h-24 object-cover border-2 shadow-sm ${photoRadiusClass}`}
            style={{ borderColor: primaryColor }}
          />
        )}
      </div>

      {/* Body */}
      <div className={`pt-6 ${spacingStyles}`}>
        {sectionOrder.map((key) => (
          <React.Fragment key={key}>{renderSectionContent(key)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};
