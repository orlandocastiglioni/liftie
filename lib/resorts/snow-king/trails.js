// same /mtn-xml/ document as the lifts ("trails": true) - the <trails> element
// wraps a plain html table, one row per run: [0] <th> name, [1] status <td>,
// [2] grooming <td>. Scoping to tbody drops the Run/Open/Groomed header row.
// Difficulty is baked into the name as a trailing parenthetical
// ("Kelly's Alley (Blue)", "Belly Roll (Double Black)") - stripped from the
// name and fed to normalizeLevel, which knows green/blue/black/doubleblack.
// Rows without a parenthetical simply come back without a level.
// Column 2 (Groomed | Ungroomed) is NOT a status - 'ungroomed' is unknown to
// coerce and would silently become 'scheduled'.
export default {
  selector: 'trails tbody tr',
  parse: {
    name: { child: 0, fn: s => s.replace(/\s*\([^)]*\)\s*$/, '').trim() },
    status: 1,
    level: { child: 0, regex: /\(([^)]+)\)\s*$/ }
  }
};
