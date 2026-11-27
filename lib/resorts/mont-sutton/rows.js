/**
 * Status on the 2026-11 conditions page is a modifier class on the status
 * element: 'flexible_statuts_dot -closed' on a chair row,
 * 'flexible_liste_des_pistes_list_cell -status -closed' on a trail row. Only
 * '-closed' has been seen (the page went live in November, before opening);
 * the visible word beside it ('Closed') is the same token, so it is the
 * fallback when no modifier is present. coerce() maps the token, so an
 * '-open' modifier needs nothing new, and an unknown one logs and reads as
 * 'scheduled' rather than being guessed.
 */
const BASE = /^(?:flexible_statuts_dot|flexible_liste_des_pistes_list_cell|-status)$/;

export function statusToken(node) {
  if (!node) {
    return;
  }
  const modifier = (node.attribs?.class ?? '').split(/\s+/).find(c => c.startsWith('-') && !BASE.test(c));
  if (modifier) {
    return modifier.slice(1);
  }
  return text(node).trim() || undefined;
}

function text(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}
