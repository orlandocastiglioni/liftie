import sections from './sections.js';

const courseLevels = { 初級: 'green', 初心: 'green', 中級: 'blue', 上級: 'black' };

export default function parse(dom) {
  return sections(dom)
    .filter(r => r.section !== 'リフト情報')
    .map(({ section, name, status }) => {
      // difficulty rides in the course name - "お仙水コース（初級者）";
      // map it to the level and drop it from the display name (other
      // parentheticals like （ポール専用） are kept)
      const m = name.match(/（(初級|初心|中級|上級)者?）/);
      return {
        name: m ? name.replace(m[0], '').trim() : name,
        status,
        level: section === 'パーク情報' ? 'terrainPark' : courseLevels[m?.[1]]
      };
    });
}
