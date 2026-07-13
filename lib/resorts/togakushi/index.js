import sections from './sections.js';

export default function parse(dom) {
  return Object.fromEntries(
    sections(dom)
      .filter(r => r.section === 'リフト情報')
      .map(({ name, status }) => [name, status])
  );
}
