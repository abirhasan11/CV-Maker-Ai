import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Sparkles, 
  Palette, 
  Type, 
  Sliders, 
  Layout, 
  Image as ImageIcon,
  Search,
  Shuffle,
  Tag,
  Flame,
  Layers,
  Copy,
  CheckCheck,
  Zap,
  Award,
  Crown,
  Briefcase,
  Cpu
} from 'lucide-react';
import { StyleConfig, TemplateId, ColorTheme, FontFamily, FontSize, SpacingDensity, UILanguage } from '../types';
import { THEME_COLORS, ThemeColorSet, getThemeColors } from '../utils/themeHelpers';

interface DesignSettingsPanelProps {
  config: StyleConfig;
  onChange: (config: StyleConfig) => void;
  lang: UILanguage;
}

export const DesignSettingsPanel: React.FC<DesignSettingsPanelProps> = ({
  config,
  onChange,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const update = <K extends keyof StyleConfig>(key: K, val: StyleConfig[K]) => {
    onChange({ ...config, [key]: val });
  };

  const currentTheme = getThemeColors(config.colorTheme);

  const templates: {
    id: TemplateId;
    name: string;
    bnName: string;
    desc: string;
    tag: string;
    wireframeType: string;
    isGraphical?: boolean;
  }[] = [
    {
      id: 'graphical-banner',
      name: 'Graphical Hero Banner',
      bnName: 'গ্রাফিক্যাল হিরো ব্যানার (আল্ট্রা-মডার্ন)',
      desc: 'High-impact gradient header with background mesh, structured card modules, and prominent QA credentials.',
      tag: '🔥 Ultra Graphical',
      wireframeType: 'graphical-banner',
      isGraphical: true,
    },
    {
      id: 'graphical-modern-grid',
      name: 'Bento Graphical Grid',
      bnName: 'বেন্টো গ্রাফিক্যাল গ্রিড (মডার্ন ড্যাশবোর্ড)',
      desc: 'Modern 2026 Bento-style grid with tinted metric cards, colorful section badges, and high visual appeal.',
      tag: '🎨 Graphical Bento',
      wireframeType: 'graphical-grid',
      isGraphical: true,
    },
    {
      id: 'designer-portfolio',
      name: 'Creative Graphic Studio',
      bnName: 'ক্রিয়েটিভ গ্রাফিক স্টুডিও (ডিজাইনার স্টাইল)',
      desc: 'Accent borders, timeline connectors, creative badges, and visual work showcase.',
      tag: '✨ Graphic Studio',
      wireframeType: 'designer',
      isGraphical: true,
    },
    {
      id: 'modern-sidebar',
      name: 'Modern Split Sidebar',
      bnName: 'মডার্ন স্প্লিট সাইডবার (২-কলাম)',
      desc: 'Dual-column layout with dark left sidebar, prominent photo display, and clear skill tags.',
      tag: 'Popular',
      wireframeType: 'sidebar',
    },
    {
      id: 'technical-sqa',
      name: 'SQA & Tech Lead Matrix',
      bnName: 'এসকিউএ অ্যান্ড টেক লিড (টেস্টিং স্পেশাল)',
      desc: 'Dedicated testing works matrix, prominent GitHub links, monospace badges, perfect for SQA & developers.',
      tag: 'SQA Choice',
      wireframeType: 'tech',
    },
    {
      id: 'infographic-pro',
      name: 'Infographic Pro Cards',
      bnName: 'ইনফোগ্রাফিক প্রো (মডার্ন কার্ড গ্রিড)',
      desc: 'Bold hero banner, 2-column card layout with skill chips and modern structured cards.',
      tag: 'Visual Pro',
      wireframeType: 'infographic',
      isGraphical: true,
    },
    {
      id: 'berlin-modern',
      name: 'Berlin Minimalist Stripe',
      bnName: 'বার্লিন মিনিমালিস্ট (ইউরোপিয়ান স্ট্রাইপ)',
      desc: 'Sleek left accent stripe, spacious typography, minimalist modern aesthetic for high-end roles.',
      tag: 'European',
      wireframeType: 'berlin',
    },
    {
      id: 'minimal-tech',
      name: 'Tech Minimalist ATS',
      bnName: 'টেক মিনিমালিস্ট (ক্লিন ও ATS ফ্রেন্ডলি)',
      desc: 'Single column, high ATS compatibility, sharp dividers, ideal for developers and SQA engineers.',
      tag: 'ATS 99%',
      wireframeType: 'single',
    },
    {
      id: 'executive-classic',
      name: 'Executive Classic',
      bnName: 'এক্সিকিউটিভ ক্লাসিক (কর্পোরেট)',
      desc: 'Elegant serif typography, formal horizontal bars, perfect for senior & managerial roles.',
      tag: 'Executive',
      wireframeType: 'classic',
    },
    {
      id: 'creative-modern',
      name: 'Creative Accent Banner',
      bnName: 'ক্রিয়েটিভ এক্সেন্ট (কালার হেডার)',
      desc: 'Top accent banner, modern badge tags, vibrant layout for designers and tech professionals.',
      tag: 'Visual',
      wireframeType: 'creative',
      isGraphical: true,
    },
    {
      id: 'compact-fresher',
      name: 'Compact 1-Page Tight',
      bnName: 'কমপ্যাক্ট ১-পেজ (এক পাতার ঘন সিভি)',
      desc: 'Compact layout optimized to fit education, projects, and skills on a single tight A4 page.',
      tag: '1-Page Fit',
      wireframeType: 'compact',
    },
    {
      id: 'cyber-matrix',
      name: 'Cyberpunk Neon Matrix',
      bnName: 'সাইবার ম্যাট্রিক্স (হাই-টেক নিয়ন ডার্ক)',
      desc: 'Glowing cyan HUD matrix, futuristic telemetry panels, and high-tech QA architecture.',
      tag: '🔥 Cyber HUD',
      wireframeType: 'tech',
      isGraphical: true,
    },
    {
      id: 'developer-terminal',
      name: 'VS Code IDE Terminal',
      bnName: 'ডেভেলপার টার্মিনাল (VS কোড স্টাইল)',
      desc: 'IDE title-bar, dark code syntax highlighting, and JSON/TypeScript object schema.',
      tag: '💻 Code IDE',
      wireframeType: 'tech',
      isGraphical: true,
    },
    {
      id: 'swiss-editorial',
      name: 'Swiss International Typographic',
      bnName: 'সুইস এডিটরিয়াল (বোল্ড টাইপোগ্রাফি)',
      desc: 'Bold Swiss typography, numbered modular sections, and sharp geometric contrast.',
      tag: '📐 Swiss Bold',
      wireframeType: 'single',
    },
    {
      id: 'nordic-clean',
      name: 'Nordic Scandinavian Minimal',
      bnName: 'নর্ডিক ক্লিন (স্ক্যান্ডিনেভিয়ান লাইট)',
      desc: 'Warm off-white linen canvas, airy asymmetric spacing, and refined clean badges.',
      tag: '🌿 Nordic',
      wireframeType: 'sidebar',
    },
    {
      id: 'tokyo-neo',
      name: 'Tokyo Neo Asymmetric Bento',
      bnName: 'টোকিও নিও (বেন্টো কার্ড ও ডার্ক ব্যানার)',
      desc: 'Asymmetric dark header capsule, rounded card modules, and modern neon accents.',
      tag: '⚡ Tokyo Bento',
      wireframeType: 'graphical-grid',
      isGraphical: true,
    },
    {
      id: 'california-sunny',
      name: 'California Sunny Warm Modern',
      bnName: 'ক্যালিফোর্নিয়া সানি (সানসেট অ্যাম্বিয়েন্ট)',
      desc: 'Warm sunset gradients, soft amber card frames, and positive modern aura.',
      tag: '☀️ Cali Sunset',
      wireframeType: 'creative',
      isGraphical: true,
    },
    {
      id: 'london-fintech',
      name: 'London Fintech Executive',
      bnName: 'লন্ডন ফিনটেক (ব্যাংকিং ও হাই সিকিউরিটি)',
      desc: 'Verified trust badge badges, institutional precision, and clean corporate cards.',
      tag: '🏦 London Fintech',
      wireframeType: 'single',
    },
    {
      id: 'architect-blueprint',
      name: 'Architect Tech Blueprint',
      bnName: 'আর্কিটেক্ট ব্লুপ্রিন্ট (ইঞ্জিনিয়ারিং গ্রিড)',
      desc: 'Deep blueprint navy background with cyan structural grid lines and monospace specs.',
      tag: '📐 Blueprint',
      wireframeType: 'tech',
      isGraphical: true,
    },
    {
      id: 'silicon-minimal',
      name: 'Silicon Valley Cupertino Clean',
      bnName: 'সিলিকন মিনিমাল (অ্যাপল স্টাইল ক্লিন)',
      desc: 'Ultra clean typography, rounded capsule tags, generous whitespace, and subtle shadows.',
      tag: '🍏 Cupertino',
      wireframeType: 'single',
    },
    {
      id: 'aurora-glass',
      name: 'Aurora Borealis Glassmorphism',
      bnName: 'অরোরা গ্লাস (গ্লোয়িং গ্রাডিয়েন্ট ডার্ক)',
      desc: 'Vibrant iridescent gradients over dark slate with translucent glass cards.',
      tag: '🌌 Aurora Glass',
      wireframeType: 'graphical-banner',
      isGraphical: true,
    },
    {
      id: 'magazine-pro',
      name: 'Editorial Magazine Dossier',
      bnName: 'ম্যাগাজিন প্রো (এডিটরিয়াল ডসিয়ার)',
      desc: 'Editorial headline masthead, drop caps, multi-column chronicle, and classic elegance.',
      tag: '📰 Magazine',
      wireframeType: 'classic',
    },
    {
      id: 'metro-card',
      name: 'Metro Tile Modern Card',
      bnName: 'মেট্রো টাইল (মডার্ন ফ্ল্যাট কার্ডস)',
      desc: 'High contrast flat tiles, structured color blocks, and bold rectangular typography.',
      tag: '🔲 Metro Flat',
      wireframeType: 'graphical-grid',
      isGraphical: true,
    },
    {
      id: 'hybrid-timeline',
      name: 'Interactive Career Timeline',
      bnName: 'হাইব্রিড টাইমলাইন (কানেক্টেড নোডস)',
      desc: 'Connected vertical timeline beads, chronology milestones, and clean project trees.',
      tag: '⏳ Timeline',
      wireframeType: 'designer',
      isGraphical: true,
    },
    {
      id: 'monochrome-bold',
      name: 'Monochrome High-Contrast Noir',
      bnName: 'মনোক্রোম বোল্ড (ব্ল্যাক অ্যান্ড হোয়াইট)',
      desc: 'Pure pitch-black and stark white contrast with heavy industrial typography.',
      tag: '⚫ Noir Bold',
      wireframeType: 'single',
    },
    {
      id: 'quantum-tech',
      name: 'Quantum GitHub Dark Tech',
      bnName: 'কোয়ান্টাম টেক (গিটহাব ডার্ক কোয়ার্ক)',
      desc: 'GitHub Dark palette with terminal telemetry tags and micro-chip badges.',
      tag: '⚛️ Quantum Dark',
      wireframeType: 'tech',
      isGraphical: true,
    },
    {
      id: 'crest-luxury',
      name: 'Imperial Gold Crest Luxury',
      bnName: 'ক্রেস্ট লাক্সারি (গোল্ডেন এম্পায়ার)',
      desc: 'Gold leaf accents, royal black background, regal serif typography, and luxury borders.',
      tag: '👑 Gold Luxury',
      wireframeType: 'classic',
      isGraphical: true,
    },
    {
      id: 'portfolio-showcase',
      name: 'QA Portfolio Studio Showcase',
      bnName: 'পোর্টফোলিও শোকেস (প্রজেক্ট কার্ডস)',
      desc: 'Showcase grid with interactive-looking project snapshots and verified deliverable cards.',
      tag: '🎯 Portfolio Pro',
      wireframeType: 'designer',
      isGraphical: true,
    },
    {
      id: 'qa-audit-matrix',
      name: 'QA Compliance & Audit Matrix',
      bnName: 'এসকিউএ অডিট ম্যাট্রিক্স (টেস্টিং ভেরিফাইড)',
      desc: 'Quality assurance checklist layout, bug verification badges, and test coverage metrics.',
      tag: '🛡️ SQA Audit',
      wireframeType: 'tech',
      isGraphical: true,
    },
    {
      id: 'executive-corporate-split',
      name: 'Corporate Executive Asymmetric Split',
      bnName: 'কর্পোরেট এক্সিকিউটিভ স্প্লিট (সিনিয়র লিড)',
      desc: 'Deep primary header banner, asymmetric 4/8 column split, and executive typography.',
      tag: '👔 Executive Split',
      wireframeType: 'sidebar',
    },
    {
      id: 'horizon-modern',
      name: 'Horizon Sunset Dual Modern',
      bnName: 'হরাইজন মডার্ন (টপ গ্রাডিয়েন্ট স্ট্রাইপ)',
      desc: 'Full-bleed horizon gradient banner with dual-column balanced document flow.',
      tag: '🌅 Horizon',
      wireframeType: 'creative',
      isGraphical: true,
    },
  ];

  // Convert all 148 themes from THEME_COLORS to an array
  const allThemesList = useMemo(() => {
    return Object.entries(THEME_COLORS).map(([id, data]) => ({
      id: id as ColorTheme,
      name: data.name,
      category: data.category,
      primary: data.primary,
      primaryBg: data.primaryBg,
      lightBg: data.lightBg,
      border: data.border,
      text: data.text,
      badgeBg: data.badgeBg,
      badgeText: data.badgeText,
      gradient: data.gradient,
      accent: data.accent || data.primary,
      dark: data.dark || false,
    }));
  }, []);

  // Distinct categories with counts
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    allThemesList.forEach((t) => {
      map.set(t.category, (map.get(t.category) || 0) + 1);
    });
    return [
      { name: 'All', count: allThemesList.length },
      ...Array.from(map.entries()).map(([name, count]) => ({ name, count }))
    ];
  }, [allThemesList]);

  // Filtered themes
  const filteredThemes = useMemo(() => {
    return allThemesList.filter(t => {
      const matchCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allThemesList, selectedCategory, searchQuery]);

  // Random theme picker
  const handleRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * allThemesList.length);
    const chosen = allThemesList[randomIndex];
    update('colorTheme', chosen.id);
  };

  // Copy hex
  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Curated Preset Pairs
  const curatedCombos = [
    {
      title: lang === 'bn' ? '🔥 আল্ট্রা গ্রাফিক্যাল SQA' : '🔥 Ultra Graphical SQA',
      template: 'graphical-banner' as TemplateId,
      theme: 'cyber-neon' as ColorTheme,
      font: 'sans' as FontFamily,
      desc: 'High-impact cyan neon header with bento badges',
    },
    {
      title: lang === 'bn' ? '💼 সিলিকন ভ্যালি টেক' : '💼 Silicon Valley Tech',
      template: 'modern-sidebar' as TemplateId,
      theme: 'silicon-navy' as ColorTheme,
      font: 'sans' as FontFamily,
      desc: 'Modern dual-column dark sidebar with high contrast',
    },
    {
      title: lang === 'bn' ? '👑 রয়্যাল এক্সিকিউটিভ গোল্ড' : '👑 Royal Executive Gold',
      template: 'crest-luxury' as TemplateId,
      theme: 'obsidian-gold' as ColorTheme,
      font: 'serif' as FontFamily,
      desc: 'Obsidian black, regal gold crest & serif elegance',
    },
    {
      title: lang === 'bn' ? '⚡ টার্মিনাল IDE হ্যাকার' : '⚡ Terminal IDE Matrix',
      template: 'developer-terminal' as TemplateId,
      theme: 'terminal-matrix' as ColorTheme,
      font: 'mono' as FontFamily,
      desc: 'Monospace code syntax with matrix emerald telemetry',
    },
    {
      title: lang === 'bn' ? '🌿 নর্ডিক স্ক্যান্ডিনেভিয়ান' : '🌿 Nordic Minimalist',
      template: 'nordic-clean' as TemplateId,
      theme: 'nordic-forest' as ColorTheme,
      font: 'sans' as FontFamily,
      desc: 'Clean Scandinavian linen tones and crisp green badges',
    },
  ];

  const fonts: { id: FontFamily; name: string; sample: string; cssFamily: string }[] = [
    { id: 'sans', name: 'Modern Sans (Inter/System)', sample: 'Abir Hasan – SQA Engineer', cssFamily: 'font-sans' },
    { id: 'serif', name: 'Editorial Serif (Merriweather/Georgia)', sample: 'Abir Hasan – SQA Engineer', cssFamily: 'font-serif' },
    { id: 'mono', name: 'Technical Mono (Code/Terminal)', sample: 'Abir Hasan – SQA Engineer', cssFamily: 'font-mono' },
  ];

  const fontSizes: { id: FontSize; name: string; desc: string }[] = [
    { id: 'sm', name: 'Compact (Small)', desc: 'Fits maximum content' },
    { id: 'md', name: 'Standard (Medium)', desc: 'Balanced & standard' },
    { id: 'lg', name: 'Spacious (Large)', desc: 'Maximum readability' },
  ];

  const densities: { id: SpacingDensity; name: string; desc: string }[] = [
    { id: 'compact', name: 'Compact (ঘন)', desc: '1-Page tight fit' },
    { id: 'normal', name: 'Standard (স্বাভাবিক)', desc: 'Balanced spacing' },
    { id: 'spacious', name: 'Spacious (উন্মুক্ত)', desc: 'Multi-page relaxed' },
  ];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-8 animate-in fade-in duration-200">
      
      {/* Quick Curated Preset Launcher */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 rounded-2xl text-white shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-extrabold tracking-wide uppercase text-amber-300">
              {lang === 'bn' ? '১-ক্লিক কিউরেটেড স্টাইল কম্বো (Curated Presets)' : '1-Click Curated Presets'}
            </span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
            {lang === 'bn' ? 'পারফেক্ট ডিজাইন ম্যাচ' : 'Perfect Design Match'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {curatedCombos.map((combo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange({
                  ...config,
                  template: combo.template,
                  colorTheme: combo.theme,
                  fontFamily: combo.font,
                });
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/15 p-2.5 rounded-xl text-left transition-all hover:scale-[1.02] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="block text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {combo.title}
                </span>
                <span className="text-[10px] text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                  {combo.desc}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] font-semibold text-slate-400 border-t border-white/10 pt-1.5">
                <span>{combo.template}</span>
                <span className="text-amber-300 font-bold">Apply →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Template Layout Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wide">
            <Layout className="w-4 h-4 text-indigo-600" />
            <span>{lang === 'bn' ? '১. টেমপ্লেট নির্বাচন করুন (Templates & Graphical Layouts)' : '1. Select Resume Template & Graphical Layout'}</span>
          </label>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            {templates.length} {lang === 'bn' ? 'টি ডিজাইন' : 'Templates'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {templates.map((tpl) => {
            const isSelected = config.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => update('template', tpl.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                }`}
              >
                {/* Visual miniature mockup */}
                <div className="w-full h-20 bg-white rounded-xl border border-slate-200 mb-3 p-1.5 flex overflow-hidden shadow-2xs group-hover:border-slate-300 transition-colors">
                  {tpl.wireframeType === 'graphical-banner' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-sm p-1 flex items-center justify-between">
                        <div className="w-1/2 h-2 bg-white/90 rounded-xs" />
                        <div className="w-3.5 h-3.5 rounded-full bg-white/70" />
                      </div>
                      <div className="flex-1 p-1 grid grid-cols-2 gap-1 bg-slate-50">
                        <div className="bg-white p-0.5 rounded-xs space-y-0.5 border border-slate-100">
                          <div className="w-full h-1 bg-indigo-500 rounded-xs" />
                          <div className="w-2/3 h-0.5 bg-slate-200 rounded-xs" />
                        </div>
                        <div className="bg-white p-0.5 rounded-xs space-y-0.5 border border-slate-100">
                          <div className="w-full h-1 bg-indigo-500 rounded-xs" />
                          <div className="w-2/3 h-0.5 bg-slate-200 rounded-xs" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'graphical-grid' && (
                    <div className="w-full h-full flex flex-col gap-1 p-1">
                      <div className="w-full h-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xs p-0.5 flex items-center justify-between">
                        <div className="w-1/3 h-1.5 bg-white rounded-xs" />
                        <div className="w-2.5 h-2.5 rounded-xs bg-white/60" />
                      </div>
                      <div className="grid grid-cols-3 gap-1 flex-1">
                        <div className="bg-cyan-50 border border-cyan-100 rounded-xs p-0.5" />
                        <div className="bg-teal-50 border border-teal-100 rounded-xs p-0.5" />
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xs p-0.5" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'designer' && (
                    <div className="w-full h-full flex flex-col p-1 space-y-1">
                      <div className="flex justify-between items-center pb-1 border-b-2 border-indigo-600">
                        <div className="w-1/2 h-2 bg-slate-900 rounded-xs" />
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="w-1/3 h-1.5 bg-indigo-600 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'sidebar' && (
                    <div className="w-full h-full flex gap-1.5">
                      <div className="w-1/3 h-full bg-slate-800 rounded-xs p-1 flex flex-col justify-between">
                        <div className="w-3 h-3 rounded-full bg-white/40 mx-auto" />
                        <div className="space-y-0.5">
                          <div className="w-full h-1 bg-white/30 rounded-xs" />
                          <div className="w-3/4 h-1 bg-white/20 rounded-xs" />
                        </div>
                      </div>
                      <div className="flex-1 h-full p-1 space-y-1">
                        <div className="w-2/3 h-1.5 bg-indigo-600 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
                        <div className="w-full h-1 bg-slate-100 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'tech' && (
                    <div className="w-full h-full p-1 space-y-1">
                      <div className="flex items-center justify-between pb-1 border-b border-blue-600">
                        <div className="w-1/2 h-1.5 bg-slate-900 rounded-xs" />
                        <div className="w-1/4 h-1 bg-blue-600 rounded-xs" />
                      </div>
                      <div className="flex gap-1 pt-0.5">
                        <div className="w-1/4 h-1 bg-blue-500 rounded-xs" />
                        <div className="flex-1 h-1 bg-slate-200 rounded-xs" />
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <div className="h-3.5 bg-slate-100 rounded-xs p-0.5">
                          <div className="w-full h-1 bg-slate-300 rounded-xs" />
                        </div>
                        <div className="h-3.5 bg-slate-100 rounded-xs p-0.5">
                          <div className="w-full h-1 bg-slate-300 rounded-xs" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'infographic' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-4 bg-indigo-600 rounded-t-xs p-1 flex items-center justify-between">
                        <div className="w-1/3 h-1.5 bg-white rounded-xs" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
                      </div>
                      <div className="flex-1 p-1 grid grid-cols-12 gap-1">
                        <div className="col-span-8 space-y-1">
                          <div className="w-full h-1 bg-slate-300 rounded-xs" />
                          <div className="w-3/4 h-1 bg-slate-200 rounded-xs" />
                        </div>
                        <div className="col-span-4 space-y-1 border-l border-slate-100 pl-1">
                          <div className="w-full h-1 bg-indigo-300 rounded-xs" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'berlin' && (
                    <div className="w-full h-full flex gap-1">
                      <div className="w-1.5 h-full bg-slate-800 rounded-xs" />
                      <div className="flex-1 p-1 space-y-1">
                        <div className="w-2/3 h-1.5 bg-slate-900 rounded-xs" />
                        <div className="w-full h-0.5 bg-slate-200" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'single' && (
                    <div className="w-full h-full p-1 space-y-1">
                      <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                        <div className="w-1/2 h-2 bg-slate-800 rounded-xs" />
                        <div className="w-1/4 h-1 bg-slate-300 rounded-xs" />
                      </div>
                      <div className="w-1/3 h-1.5 bg-indigo-600 rounded-xs mt-1" />
                      <div className="w-full h-1 bg-slate-200 rounded-xs" />
                    </div>
                  )}

                  {tpl.wireframeType === 'classic' && (
                    <div className="w-full h-full p-1 space-y-1 text-center flex flex-col items-center">
                      <div className="w-2/3 h-2 bg-slate-900 rounded-xs mx-auto" />
                      <div className="w-full h-0.5 bg-slate-900 my-0.5" />
                      <div className="w-full space-y-1 text-left">
                        <div className="w-1/3 h-1.5 bg-slate-800 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'creative' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-4 bg-indigo-600 rounded-t-xs p-1 flex items-center justify-between">
                        <div className="w-1/2 h-1.5 bg-white rounded-xs" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/50" />
                      </div>
                      <div className="flex-1 p-1 space-y-1">
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                        <div className="w-3/4 h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.wireframeType === 'compact' && (
                    <div className="w-full h-full p-1 flex gap-1">
                      <div className="w-1/2 h-full space-y-1">
                        <div className="w-full h-1.5 bg-indigo-600 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                      </div>
                      <div className="w-1/2 h-full space-y-1 border-l border-slate-100 pl-1">
                        <div className="w-3/4 h-1.5 bg-slate-700 rounded-xs" />
                        <div className="w-full h-1 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">
                      {lang === 'bn' ? tpl.bnName : tpl.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{tpl.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color & Graphical Themes Studio */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wide">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'bn' ? '২. কালার ও গ্রাফিক্যাল থিম নির্বাচন (১০০+ থিম)' : '2. Color & Graphical Themes (100+ Palettes)'}</span>
            </label>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' 
                ? 'নিয়ন গ্রাফিক্স, টেক ব্র্যান্ড, লাক্সারি, নেচার ও স্পেশাল থিম থেকে পছন্দ করুন' 
                : 'Choose from vibrant neon graphical, modern tech brands, luxury dark, botanical, and sunset palettes.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {/* Random Theme Button */}
            <button
              type="button"
              onClick={handleRandomTheme}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              title="Pick a Random Theme"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'র‍্যান্ডম থিম (🎲)' : 'Random Theme'}</span>
            </button>

            <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
              {currentTheme.name}
            </span>
          </div>
        </div>

        {/* 🌟 LIVE THEME INSPECTOR / SHOWCASE CARD */}
        <div className="p-4 rounded-2xl border border-slate-200/90 shadow-sm bg-gradient-to-b from-slate-50/80 to-white">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200/60">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {lang === 'bn' ? 'লাইভ থিম প্রিভিউ ও কালার ইন্সপেক্টর' : 'Live Theme Inspector & Color Studio'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                {currentTheme.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => copyHex(currentTheme.primary)}
                className="text-[11px] flex items-center space-x-1 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg cursor-pointer transition-colors shadow-2xs"
                title="Copy Primary Hex"
              >
                {copiedHex === currentTheme.primary ? <CheckCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="font-mono">{currentTheme.primary}</span>
              </button>
            </div>
          </div>

          {/* Mini Live Resume Header & Card Demonstration */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            {/* Header Banner */}
            <div 
              className="p-3 text-white flex items-center justify-between"
              style={{ background: currentTheme.gradient || currentTheme.primary }}
            >
              <div>
                <span className="text-xs font-extrabold tracking-tight block drop-shadow-xs">
                  Abir Hasan
                </span>
                <span className="text-[10px] opacity-90 block">
                  Lead Software QA Automation Engineer
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span 
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs border border-white/20"
                  style={{ backgroundColor: currentTheme.accent || '#ffffff', color: '#0f172a' }}
                >
                  Verified QA Lead
                </span>
              </div>
            </div>

            {/* Content Body Preview */}
            <div className="p-3 bg-white space-y-2.5">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-1.5 h-3.5 rounded-full" 
                  style={{ backgroundColor: currentTheme.primary }} 
                />
                <span 
                  className="text-[11px] font-extrabold uppercase tracking-wider"
                  style={{ color: currentTheme.primary }}
                >
                  Work Experience & Frameworks
                </span>
              </div>

              <div className={`p-2 rounded-lg border ${currentTheme.border} ${currentTheme.lightBg} flex items-center justify-between`}>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block">
                    Senior QA Automation Engineer — Silicon Soft
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Lead automated testing workflows, CI/CD pipeline verification & test architecture
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentTheme.badgeBg} ${currentTheme.badgeText}`}>
                  2022 – Present
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Selenium WebDriver', 'Cypress.io', 'Playwright', 'Jest/Mocha', 'Postman API', 'Docker QA'].map((skill, i) => (
                  <span
                    key={i}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${currentTheme.border} ${currentTheme.badgeBg} ${currentTheme.badgeText}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? '১০০+ থিম খুঁজুন (যেমন: Cyber, Neon, Azure, Emerald, Gold, Sunset)...' : 'Search 100+ themes (e.g. Cyber, Neon, Azure, Gold, Sunset, Matrix)...'}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isCatActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    isCatActive
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isCatActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 100+ Themes Grid with Visual Orbs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-[380px] overflow-y-auto p-1 custom-scrollbar">
          {filteredThemes.map((c) => {
            const isSelected = config.colorTheme === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => update('colorTheme', c.id)}
                className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-2xs'
                }`}
                title={`${c.name} (${c.category}) - Primary: ${c.primary}`}
              >
                {/* Visual Dual-Tone Orb Swatch */}
                <div 
                  className="w-8 h-8 rounded-full shadow-2xs flex items-center justify-center text-white mb-1.5 transition-transform group-hover:scale-110 relative overflow-hidden border border-black/15"
                  style={{ 
                    background: c.gradient || c.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  {/* Subtle Accent Glow Dot */}
                  {c.accent && (
                    <div 
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: c.accent }}
                    />
                  )}
                  {isSelected && (
                    <div className="bg-black/35 w-full h-full flex items-center justify-center absolute inset-0">
                      <Check className="w-3.5 h-3.5 drop-shadow-md text-white font-extrabold" />
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-800 font-bold truncate w-full leading-tight">
                  {c.name}
                </span>
                <span className="text-[9px] text-slate-500 truncate w-full leading-tight">
                  {c.category}
                </span>
              </button>
            );
          })}
        </div>

        {filteredThemes.length === 0 && (
          <div className="text-center py-6 text-slate-500 text-xs bg-slate-50 rounded-xl">
            {lang === 'bn' ? 'কোনো থিম খুঁজে পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।' : 'No themes matched your search query. Try another keyword.'}
          </div>
        )}
      </div>

      {/* 3. Typography & Font Family */}
      <div className="space-y-3.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wide">
          <Type className="w-4 h-4 text-indigo-600" />
          <span>{lang === 'bn' ? '৩. ফন্ট স্টাইল (Typography)' : '3. Font Typography'}</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {fonts.map((f) => {
            const isSelected = config.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => update('fontFamily', f.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">{f.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div className={`text-xs text-slate-600 ${f.cssFamily} pt-1 border-t border-slate-100`}>
                  {f.sample}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Font Size & Density Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        {/* Font Size */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
            {lang === 'bn' ? 'ফন্ট সাইজ' : 'Font Size'}
          </label>
          <div className="space-y-1.5">
            {fontSizes.map((s) => {
              const isSelected = config.fontSize === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => update('fontSize', s.id)}
                  className={`w-full px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="text-[10px] text-slate-500">{s.desc}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacing Density */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
            {lang === 'bn' ? 'স্পেসিং ডেনসিটি' : 'Layout Density'}
          </label>
          <div className="space-y-1.5">
            {densities.map((d) => {
              const isSelected = config.density === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => update('density', d.id)}
                  className={`w-full px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div>
                    <span className="block font-semibold">{d.name}</span>
                    <span className="text-[10px] text-slate-500">{d.desc}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Photo Visibility Toggle */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 p-4 rounded-xl border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              {lang === 'bn' ? 'প্রোফাইল ছবি দেখান (Show Profile Photo)' : 'Show Profile Photo'}
            </span>
            <span className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'সিভিতে ছবি প্রদর্শন বা লুকানোর টগল' : 'Toggle profile photo visibility in template'}
            </span>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.showPhoto}
            onChange={(e) => update('showPhoto', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
    </div>
  );
};
