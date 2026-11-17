import { RateLimiter } from 'limiter';

export default function Limiter(...args) {
  const items = argsToLimiters(args);
  return limit;

  // limiter 4 reports fractional, continuously refilling balances: right after
  // the last whole token is spent `getTokensRemaining()` is already a tiny
  // positive number, so `> 0` would read an exhausted bucket as available and
  // the caller would sit in `removeTokens()` instead of being told to fetch
  // later. `getWaitTime(1)` is zero only when a whole token is available now,
  // and it also accounts for the interval allowance.
  function hasTokens() {
    return items.every(l => l.getWaitTime(1) === 0);
  }

  function removeToken() {
    return Promise.all(items.map(l => l.removeTokens(1)));
  }

  function limit(fn) {
    return hasTokens() ? removeToken().then(() => fn(), fn) : process.nextTick(fn, { fetchLater: true });
  }

  function argsToLimiters(args) {
    const rts = [];
    for (let i = 0; i < args.length; i += 2) {
      const rt = new RateLimiter({
        tokensPerInterval: args[i],
        interval: args[i + 1]
      });
      rts.push(rt);
    }
    return rts;
  }
}
