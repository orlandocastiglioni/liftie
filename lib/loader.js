import fs from 'node:fs/promises';

export default async function load() {
  let names = await fs.readdir(`${import.meta.dirname}/resorts`);
  // local patch: LIFTIE_RESORTS=<comma separated ids> limits the registry,
  // so the background fetcher never scrapes resorts we don't serve
  const only = process.env.LIFTIE_RESORTS?.split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (only?.length) {
    names = names.filter(name => only.includes(name));
  }
  const entries = names.map(entry);
  return Object.fromEntries(await Promise.all(entries));
}

async function entry(id) {
  const { default: resort } = await import(`./resorts/${id}/resort.json`, { with: { type: 'json' } });
  return [id, { id, ...resort }];
}
