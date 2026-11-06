import React, { useState, useRef } from 'react';
import { CVData, CVCustomization } from '../../types/cv';
import { TEMPLATES } from '../../data/sampleCV';
import { CVRenderer } from '../templates/CVRenderer';
import { downloadCVAsPDF, downloadCVAsPNG, downloadCVAsJPG } from '../../utils/exportCV';
import {
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileDown,
  Image,
  Loader2,
  Sparkles,
  CheckCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface Props {
  data: CVData;
  customization: CVCustomization;
  onCustomizationChange: (customization: Partial<CVCustomization>) => void;
  onOpenUpgradeModal: () => void;
  isPremiumUser: boolean;
  lastSavedAt?: string;
}

export const LivePreviewPanel: React.FC<Props> = ({
  data,
  customization,
  onCustomizationChange,
  onOpenUpgradeModal,
  isPremiumUser,
  lastSavedAt,
}) => {
  const [zoom, setZoom] = useState<number>(0.9);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | 'jpg' | null>(null);
  const [showFullModal, setShowFullModal] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    const el = document.getElementById('cv-document-sheet');
    if (!el) return;
    setIsExporting('pdf');
    try {
      await downloadCVAsPDF({
        element: el,
        fileName: `${data.personalInfo.fullName || 'CVCraft'}_Resume`,
        paperSize: customization.paperSize,
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPNG = async () => {
    if (!isPremiumUser && false) {
      // Free users can download PNG as specified in monetization: "Standard resolution image export"
    }
    const el = document.getElementById('cv-document-sheet');
    if (!el) return;
    setIsExporting('png');
    try {
      await downloadCVAsPNG({
        element: el,
        fileName: `${data.personalInfo.fullName || 'CVCraft'}_Resume`,
      });
    } catch (err) {
      console.error('PNG export failed:', err);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportJPG = async () => {
    const el = document.getElementById('cv-document-sheet');
    if (!el) return;
    setIsExporting('jpg');
    try {
      await downloadCVAsJPG({
        element: el,
        fileName: `${data.personalInfo.fullName || 'CVCraft'}_Resume`,
      });
    } catch (err) {
      console.error('JPG export failed:', err);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/5 rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
      {/* Top Preview Action Bar */}
      <div className="p-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-blue-600" /> Live CV Preview
          </span>

          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
            {customization.paperSize.toUpperCase()}
          </span>

          {lastSavedAt && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <CheckCircle className="w-3 h-3" /> Saved {lastSavedAt}
            </span>
          )}
        </div>

        {/* Quick Template Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={customization.templateId}
            onChange={(e) => {
              const tmpl = TEMPLATES.find((t) => t.id === e.target.value);
              if (tmpl?.isPremium && !isPremiumUser) {
                onOpenUpgradeModal();
                return;
              }
              onCustomizationChange({ templateId: e.target.value as any });
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 hover:bg-slate-100 focus:outline-hidden"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} {t.isPremium ? '★ PRO' : ''}
              </option>
            ))}
          </select>

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-slate-600">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1 hover:bg-white rounded text-slate-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 font-semibold">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
              className="p-1 hover:bg-white rounded text-slate-600"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* REAL EXPORT ACTION BUTTONS */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting !== null}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50"
            title="Download printable PDF format"
          >
            {isExporting === 'pdf' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" /> Download PDF
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportPNG}
            disabled={isExporting !== null}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            title="Download high-resolution PNG image"
          >
            {isExporting === 'png' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Image className="w-3.5 h-3.5" />}
            PNG
          </button>

          <button
            type="button"
            onClick={handleExportJPG}
            disabled={isExporting !== null}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            title="Download JPG image"
          >
            {isExporting === 'jpg' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Image className="w-3.5 h-3.5" />}
            JPG
          </button>
        </div>
      </div>

      {/* Sheet Viewport Scroll Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center bg-slate-200/50 min-h-[500px]">
        <div
          ref={printRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shadow-2xl rounded-sm transition-shadow"
        >
          <CVRenderer data={data} customization={customization} />
        </div>
      </div>
    </div>
  );
};
