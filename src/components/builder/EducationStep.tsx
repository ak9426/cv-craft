import React from 'react';
import { Education } from '../../types/cv';
import { Plus, Trash2, ArrowUp, ArrowDown, GraduationCap, School } from 'lucide-react';

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationStep: React.FC<Props> = ({ education, onChange }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      major: '',
      startYear: '',
      graduationYear: '',
      gpa: '',
      additionalInfo: '',
    };
    onChange([...education, newEdu]);
  };

  const updateEducation = (id: string, updated: Partial<Education>) => {
    onChange(education.map((edu) => (edu.id === id ? { ...edu, ...updated } : edu)));
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= education.length) return;
    const copy = [...education];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Education & Qualifications</h2>
          <p className="text-sm text-slate-500">
            Add your degrees, universities, diplomas, or academic achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No education entries added</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your degree, high school, or certification program.</p>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
          >
            Add First Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    #{index + 1}
                  </div>
                  <span className="font-bold text-slate-800 text-sm">
                    {edu.degree || 'Degree Program'} {edu.major ? `in ${edu.major}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveEducation(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === education.length - 1}
                    onClick={() => moveEducation(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institution / University <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Stanford University"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Degree or Qualification <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bachelor of Science (B.S.)"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science, Economics"
                    value={edu.major}
                    onChange={(e) => updateEducation(edu.id, { major: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Grade / GPA (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.8 / 4.0 or First Class Honours"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Start Year
                  </label>
                  <input
                    type="text"
                    placeholder="2018"
                    value={edu.startYear}
                    onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Graduation Year (or Expected)
                  </label>
                  <input
                    type="text"
                    placeholder="2022"
                    value={edu.graduationYear}
                    onChange={(e) => updateEducation(edu.id, { graduationYear: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Honors, Coursework, or Additional Details (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Magna Cum Laude, Dean’s Honors List, Senior Capstone Award"
                  value={edu.additionalInfo || ''}
                  onChange={(e) => updateEducation(edu.id, { additionalInfo: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
