import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Printer, 
  Download, 
  Maximize2,
  FileCheck,
  Eye,
  Image as ImageIcon,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ResumeData, StyleConfig, UILanguage } from '../../types';
import { ModernSidebarTemplate } from '../Templates/ModernSidebarTemplate';
import { MinimalTechTemplate } from '../Templates/MinimalTechTemplate';
import { ExecutiveClassicTemplate } from '../Templates/ExecutiveClassicTemplate';
import { CreativeModernTemplate } from '../Templates/CreativeModernTemplate';
import { CompactFresherTemplate } from '../Templates/CompactFresherTemplate';
import { InfographicProTemplate } from '../Templates/InfographicProTemplate';
import { BerlinModernTemplate } from '../Templates/BerlinModernTemplate';
import { TechnicalSqaTemplate } from '../Templates/TechnicalSqaTemplate';
import { GraphicalBannerTemplate } from '../Templates/GraphicalBannerTemplate';
import { GraphicalModernGridTemplate } from '../Templates/GraphicalModernGridTemplate';
import { DesignerPortfolioTemplate } from '../Templates/DesignerPortfolioTemplate';
import { CyberMatrixTemplate } from '../Templates/CyberMatrixTemplate';
import { SwissEditorialTemplate } from '../Templates/SwissEditorialTemplate';
import { NordicCleanTemplate } from '../Templates/NordicCleanTemplate';
import { ExecutiveCorporateSplitTemplate } from '../Templates/ExecutiveCorporateSplitTemplate';
import { DeveloperTerminalTemplate } from '../Templates/DeveloperTerminalTemplate';
import { TokyoNeoTemplate } from '../Templates/TokyoNeoTemplate';
import { CaliforniaSunnyTemplate } from '../Templates/CaliforniaSunnyTemplate';
import { LondonFintechTemplate } from '../Templates/LondonFintechTemplate';
import { ArchitectBlueprintTemplate } from '../Templates/ArchitectBlueprintTemplate';
import { SiliconMinimalTemplate } from '../Templates/SiliconMinimalTemplate';
import { AuroraGlassTemplate } from '../Templates/AuroraGlassTemplate';
import { MagazineProTemplate } from '../Templates/MagazineProTemplate';
import { MetroCardTemplate } from '../Templates/MetroCardTemplate';
import { HybridTimelineTemplate } from '../Templates/HybridTimelineTemplate';
import { MonochromeBoldTemplate } from '../Templates/MonochromeBoldTemplate';
import { QuantumTechTemplate } from '../Templates/QuantumTechTemplate';
import { CrestLuxuryTemplate } from '../Templates/CrestLuxuryTemplate';
import { PortfolioShowcaseTemplate } from '../Templates/PortfolioShowcaseTemplate';
import { QaAuditMatrixTemplate } from '../Templates/QaAuditMatrixTemplate';
import { HorizonModernTemplate } from '../Templates/HorizonModernTemplate';
import { getTranslation } from '../../data/translations';

interface ResumePreviewProps {
  resume: ResumeData;
  config: StyleConfig;
  lang: UILanguage;
  onPrint: () => void;
  onUpdateConfig?: (config: StyleConfig) => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  config,
  lang,
  onPrint,
  onUpdateConfig,
}) => {
  const t = getTranslation(lang);
  const [zoom, setZoom] = useState<number>(0.9);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.9);

  const togglePhoto = () => {
    if (onUpdateConfig) {
      onUpdateConfig({ ...config, showPhoto: !config.showPhoto });
    }
  };

  const renderTemplate = () => {
    switch (config.template) {
      case 'modern-sidebar':
        return <ModernSidebarTemplate resume={resume} config={config} />;
      case 'minimal-tech':
        return <MinimalTechTemplate resume={resume} config={config} />;
      case 'executive-classic':
        return <ExecutiveClassicTemplate resume={resume} config={config} />;
      case 'creative-modern':
        return <CreativeModernTemplate resume={resume} config={config} />;
      case 'compact-fresher':
        return <CompactFresherTemplate resume={resume} config={config} />;
      case 'infographic-pro':
        return <InfographicProTemplate resume={resume} config={config} />;
      case 'berlin-modern':
        return <BerlinModernTemplate resume={resume} config={config} />;
      case 'technical-sqa':
        return <TechnicalSqaTemplate resume={resume} config={config} />;
      case 'graphical-banner':
        return <GraphicalBannerTemplate resume={resume} config={config} />;
      case 'graphical-modern-grid':
        return <GraphicalModernGridTemplate resume={resume} config={config} />;
      case 'designer-portfolio':
        return <DesignerPortfolioTemplate resume={resume} config={config} />;
      case 'cyber-matrix':
        return <CyberMatrixTemplate resume={resume} config={config} />;
      case 'swiss-editorial':
        return <SwissEditorialTemplate resume={resume} config={config} />;
      case 'nordic-clean':
        return <NordicCleanTemplate resume={resume} config={config} />;
      case 'executive-corporate-split':
        return <ExecutiveCorporateSplitTemplate resume={resume} config={config} />;
      case 'developer-terminal':
        return <DeveloperTerminalTemplate resume={resume} config={config} />;
      case 'tokyo-neo':
        return <TokyoNeoTemplate resume={resume} config={config} />;
      case 'california-sunny':
        return <CaliforniaSunnyTemplate resume={resume} config={config} />;
      case 'london-fintech':
        return <LondonFintechTemplate resume={resume} config={config} />;
      case 'architect-blueprint':
        return <ArchitectBlueprintTemplate resume={resume} config={config} />;
      case 'silicon-minimal':
        return <SiliconMinimalTemplate resume={resume} config={config} />;
      case 'aurora-glass':
        return <AuroraGlassTemplate resume={resume} config={config} />;
      case 'magazine-pro':
        return <MagazineProTemplate resume={resume} config={config} />;
      case 'metro-card':
        return <MetroCardTemplate resume={resume} config={config} />;
      case 'hybrid-timeline':
        return <HybridTimelineTemplate resume={resume} config={config} />;
      case 'monochrome-bold':
        return <MonochromeBoldTemplate resume={resume} config={config} />;
      case 'quantum-tech':
        return <QuantumTechTemplate resume={resume} config={config} />;
      case 'crest-luxury':
        return <CrestLuxuryTemplate resume={resume} config={config} />;
      case 'portfolio-showcase':
        return <PortfolioShowcaseTemplate resume={resume} config={config} />;
      case 'qa-audit-matrix':
        return <QaAuditMatrixTemplate resume={resume} config={config} />;
      case 'horizon-modern':
        return <HorizonModernTemplate resume={resume} config={config} />;
      default:
        return <ModernSidebarTemplate resume={resume} config={config} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 relative">
      {/* Floating Preview Toolbar */}
      <div className="no-print sticky top-16 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>A4 Document Preview</span>
          </div>
          <span className="text-[11px] text-slate-400">|</span>
          <span className="text-[11px] text-slate-500 font-mono">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {/* Zoom controls */}
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Toggle Photo Quick Button */}
          {onUpdateConfig && (
            <button
              type="button"
              onClick={togglePhoto}
              className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                config.showPhoto
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Toggle Photo Visibility"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{config.showPhoto ? (lang === 'bn' ? 'ছবি: চালু' : 'Photo: ON') : (lang === 'bn' ? 'ছবি: বন্ধ' : 'Photo: OFF')}</span>
            </button>
          )}

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Quick Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start custom-scrollbar"
      >
        <div 
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm',
            minHeight: '297mm',
          }}
          className="shadow-2xl rounded-xs transition-shadow duration-300"
        >
          {/* Printable Element ID is targeted by @media print */}
          <div 
            id="resume-printable-area" 
            className="w-[210mm] min-h-[297mm] bg-white overflow-hidden text-slate-800"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
