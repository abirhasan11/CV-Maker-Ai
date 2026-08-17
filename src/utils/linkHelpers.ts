/**
 * Helper utility to safely format and normalize link URLs for both web preview
 * and direct PDF export annotation embedding across desktop & mobile devices.
 */
export function formatHref(
  value: string | undefined | null,
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'url' = 'url'
): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (type === 'email') {
    return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`;
  }

  if (type === 'phone') {
    const cleanDigits = trimmed.replace(/[^\d+]/g, '');
    return trimmed.startsWith('tel:') ? trimmed : `tel:${cleanDigits}`;
  }

  if (type === 'linkedin') {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('linkedin.com/')) return `https://${trimmed}`;
    if (trimmed.startsWith('www.linkedin.com/')) return `https://${trimmed}`;
    return `https://linkedin.com/in/${trimmed.replace(/^\/+/, '')}`;
  }

  if (type === 'github') {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('github.com/')) return `https://${trimmed}`;
    if (trimmed.startsWith('www.github.com/')) return `https://${trimmed}`;
    return `https://github.com/${trimmed.replace(/^\/+/, '')}`;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function cleanDisplayHandle(url: string | undefined | null, type: 'linkedin' | 'github'): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (type === 'linkedin') {
    return trimmed
      .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')
      .replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')
      .replace(/\/+$/, '');
  }
  if (type === 'github') {
    return trimmed
      .replace(/^https?:\/\/(www\.)?github\.com\//, '')
      .replace(/\/+$/, '');
  }
  return trimmed;
}
