import { pane } from './index.js';

// Same page and same tab widget as the lifts, two different panes: pane
// membership IS the status, there is no per-row token. No difficulty is
// published anywhere in the markup (no class, icon, colour or word) and the
// linked trail map PDF is rasterised, so rows carry no level.
// NOTE the currently-closed-runs pane has held nothing but the
// "Check Back for Closed Runs" placeholder in every capture 2024-2026, so in
// practice this reports open trails only.
export default function parse(dom) {
  return [
    ...pane(dom, 'currently-open-runs').map(name => ({ name, status: 'open' })),
    ...pane(dom, 'currently-closed-runs').map(name => ({ name, status: 'closed' }))
  ];
}
