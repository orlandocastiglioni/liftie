import { current, notCurrent } from './feed.js';

// trails[] of the public-report feed (feed.js); status and difficulty are
// coerced and normalised by lib/trails/parse.js
export default function parse(body) {
  if (!current(body)) {
    return notCurrent([], body);
  }
  return (body.trails ?? []).map(({ name, status, difficulty }) => ({
    name,
    status,
    level: difficulty
  }));
}
