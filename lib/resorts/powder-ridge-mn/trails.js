import rows from './rows.js';

// 16 trails under the "Trail Availability:" heading, same row markup as the
// lifts but with name and difficulty fused into the title:
// "Single Cedar (intermediate):". Only easy/intermediate/difficult are used
// and normalizeLevel knows all three.
const nameAndLevel = /^(.*?)\s*\(([^)]+)\)$/;

export default function parse(dom) {
  return rows(dom, /\btrails?\b/i).map(({ name, status }) => {
    const m = name.match(nameAndLevel);
    const trail = { name: m ? m[1].trim() : name, status };
    if (m) {
      trail.level = m[2].trim();
    }
    // the three terrain parks are all labelled "(difficult)", which would
    // otherwise render them as black diamonds
    if (/-\s*terrain park$/i.test(trail.name)) {
      trail.level = 'terrainPark';
    }
    return trail;
  });
}
