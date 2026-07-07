function encodeDataAttr(id: string, type: string, path: string): string {
  const parts: string[] = [];
  parts.push(`id=${id}`);
  if (type) parts.push(`type=${type}`);
  if (path) parts.push(`path=${path}`);
  parts.push(`base=${encodeURIComponent('/admin')}`);
  return parts.join(';');
}

export function ve(id: string, type: string, path: string): Record<string, string> {
  try {
    const value = encodeDataAttr(id, type, path);
    return value ? { 'data-sanity': value } : {};
  } catch {
    return {};
  }
}