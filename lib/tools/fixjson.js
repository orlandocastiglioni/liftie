/**
 * tolerant JSON parse for feeds that emit dangling commas - e.g. bolton
 * valley's admin-ajax conditions feed renders excluded entries as bare
 * whitespace, leaving '[ , {...}]' in the payload. strict parse is tried
 * first so well-formed bodies are never touched.
 */
export default function parseLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    const repaired = text
      .replace(/,\s*(?=,)/g, '') // collapse comma runs
      .replace(/\[\s*,/g, '[') // leading comma in an array
      .replace(/,\s*([\]}])/g, '$1'); // trailing comma before a closer
    return JSON.parse(repaired);
  }
}
