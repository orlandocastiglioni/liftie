import trails from '../trails/index.js';

// Same /trail-map fixture as the lifts test. The page publishes all 31 run
// names and their difficulty, but the two status repeaters that back the
// "Status" column render 31 empty listitem shells - confirmed in plain curl
// and in a full browser render, so this is not a post-load XHR problem.
//
// The expected result is therefore deliberately empty: with no status token
// the parser drops the row rather than letting collect() coerce `undefined`
// into 'scheduled' and publish 31 runs that are neither open nor closed.
// If the resort starts populating that column in season the positional join
// in trails.js picks it up and this expectation needs to be regenerated.
trails('pomerelle', []);
