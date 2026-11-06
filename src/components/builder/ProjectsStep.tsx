import React from 'react';
import { ProjectItem, CertificationItem } from '../../types/cv';
import { Plus, Trash2, FolderGit2, Award, ExternalLink } from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  certifications: CertificationItem[];
  onProjectsChange: (projects: ProjectItem[]) => void;
  onCertificationsChange: (certifications: CertificationItem[]) => void;
}

export const ProjectsStep: React.FC<Props> = ({
  projects,
  certifications,
  onProjectsChange,
  onCertificationsChange,
}) => {
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: '',
      url: '',
      role: '',
    };
    onProjectsChange([...projects, newProj]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    onProjectsChange(projects.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const removeProject = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id));
  };

  const addCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
    };
    onCertificationsChange([...certifications, newCert]);
  };

  const updateCert = (id: string, updated: Partial<CertificationItem>) => {
    onCertificationsChange(certifications.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const removeCert = (id: string) => {
    onCertificationsChange(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* PROJECTS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Projects & Portfolio</h2>
            <p className="text-sm text-slate-500">
              Highlight notable side-projects, open-source work, client engagements, or capstones.
            </p>
          </div>

          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 border border-dashed rounded-xl text-xs text-slate-400">
            No projects added yet. Click above to showcase your best initiatives.
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-blue-500" /> Project #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-rose-500 hover:text-rose-700 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Distributed Task Orchestrator"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Role / Contribution</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Architect, Core Contributor"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Live URL or Repository</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={proj.url || ''}
                      onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Technologies Used</label>
                    <input
                      type="text"
                      placeholder="e.g. TypeScript, React, Docker, Redis, Tailwind"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Description & Impact</label>
                    <textarea
                      rows={2}
                      placeholder="Built a fault-tolerant microservice pipeline that processed 15k events/sec..."
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CERTIFICATIONS SECTION */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Certifications & Licenses</h2>
            <p className="text-sm text-slate-500">
              Industry credentials from AWS, Google, Microsoft, Scrum Alliance, etc.
            </p>
          </div>

          <button
            type="button"
            onClick={addCert}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 border border-dashed rounded-xl text-xs text-slate-400">
            No certifications added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
                <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-700 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Certificate
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCert(cert.id)}
                    className="text-rose-500 hover:text-rose-700 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Certificate Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCert(cert.id, { name: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Issuing Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Issue Date</label>
                      <input
                        type="month"
                        value={cert.issueDate}
                        onChange={(e) => updateCert(cert.id, { issueDate: e.target.value })}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Expiry Date</label>
                      <input
                        type="month"
                        value={cert.expiryDate || ''}
                        onChange={(e) => updateCert(cert.id, { expiryDate: e.target.value })}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Credential ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="AWS-PSA-49102"
                      value={cert.credentialId || ''}
                      onChange={(e) => updateCert(cert.id, { credentialId: e.target.value })}
                      className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
