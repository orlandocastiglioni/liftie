// same wp-api SnowReport feed as the lifts (flaresolverr-proxied, see
// resort.json); Trails[] carries the full 30-run roster year round:
// { Name, Active, TrailLevel, Status: { Open } }
//
// TrailLevel tokens (Easiest | More Difficult | Most Difficult | Expert Only |
// Terrain Park) all normalize in lib/trails/parse.js
export default function parse(data) {
  return (data.Trails ?? [])
    .filter(trail => trail.Active)
    .map(trail => ({
      name: trail.Name,
      status: trail.Status.Open ? 'open' : 'closed',
      level: trail.TrailLevel
    }));
}
