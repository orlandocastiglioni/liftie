// Lumiplan carries status as the state-icon filename, lp_runway_trail_<token>.svg.
// coerce already knows every token this template emits except one: `out_period`
// ("outside the operating period", what the whole mountain shows between seasons)
// normalizes to 'outperiod', which is not in coerce's map and would silently be
// published as 'scheduled' - i.e. an out-of-season Corralco would read as
// about-to-open all winter. Map it, pass everything else straight through.
export default function status(token = '') {
  return token === 'out_period' ? 'closed' : token;
}
