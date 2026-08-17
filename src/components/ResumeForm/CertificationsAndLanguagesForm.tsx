import React, { useState } from 'react';
import { 
  Award, 
  Languages, 
  Plus, 
  Trash2, 
  HeartHandshake,
  Tag
} from 'lucide-react';
import { Certification, LanguageItem, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface CertificationsAndLanguagesFormProps {
  certifications: Certification[];
  onChangeCertifications: (certs: Certification[]) => void;
  languages: LanguageItem[];
  onChangeLanguages: (langs: LanguageItem[]) => void;
  interests?: string[];
  onChangeInterests: (interests: string[]) => void;
  lang: UILanguage;
}

export const CertificationsAndLanguagesForm: React.FC<CertificationsAndLanguagesFormProps> = ({
  certifications,
  onChangeCertifications,
  languages,
  onChangeLanguages,
  interests = [],
  onChangeInterests,
  lang,
}) => {
  const t = getTranslation(lang);
  const [newInterest, setNewInterest] = useState('');

  // Certifications handlers
  const addCert = () => {
    onChangeCertifications([
      ...certifications,
      { id: `cert-${Date.now()}`, name: '', issuer: '', date: '', link: '' },
    ]);
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    onChangeCertifications(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCert = (id: string) => {
    onChangeCertifications(certifications.filter((c) => c.id !== id));
  };

  // Languages handlers
  const addLanguage = () => {
    onChangeLanguages([...languages, { name: '', proficiency: 'Fluent' }]);
  };

  const updateLanguage = (index: number, field: keyof LanguageItem, value: string) => {
    const next = [...languages];
    next[index] = { ...next[index], [field]: value };
    onChangeLanguages(next);
  };

  const removeLanguage = (index: number) => {
    onChangeLanguages(languages.filter((_, i) => i !== index));
  };

  // Interests handlers
  const addInterest = () => {
    const val = newInterest.trim();
    if (!val) return;
    if (!interests.includes(val)) {
      onChangeInterests([...interests, val]);
    }
    setNewInterest('');
  };

  const removeInterest = (index: number) => {
    onChangeInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Certifications Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">{t.certifications}</h3>
              <p className="text-[11px] text-slate-500">Verified credentials, licenses & badges</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addCert}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addCertification}</span>
          </button>
        </div>

        <div className="space-y-3">
          {certifications.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              No certifications added yet. Click "+ Add Certification" to add.
            </div>
          ) : (
            certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-2"
              >
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                  placeholder="Certificate Name (e.g. AWS Certified Architect)"
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                  placeholder="Issuer (e.g. Amazon / Google)"
                  className="w-full sm:w-36 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                  placeholder="Year (e.g. 2023)"
                  className="w-full sm:w-20 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
