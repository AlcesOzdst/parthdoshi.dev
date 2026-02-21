export function parseMarkdown(raw: string) {
  // Simple frontmatter parser for markdown strings
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    return { meta: {} as Record<string, string>, content: raw.trim() };
  }
  
  const metaLines = match[1].split('\n');
  const meta: Record<string, string> = {};
  
  metaLines.forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      // Remove starting and ending quotes if present
      value = value.replace(/^["']|["']$/g, '');
      meta[key] = value;
    }
  });
  
  return { meta, content: match[2].trim() };
}
