import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Ober Mountain runs a Next.js site whose slope report is server-rendered from
 * Storyblok. The whole page payload sits in <script id="__NEXT_DATA__">, and
 * the report lives in the "Slopes Table" block of the story body:
 *
 *   props.pageProps.story.content.body
 *     [{component: 'Slopes Table', slopes: [{name, status, difficulty, lifts}]}]
 *
 * The same table is also server-rendered as HTML further down the page, but the
 * markup is duplicated for the mobile and desktop layouts and encodes the
 * difficulty as a coloured dot, so the JSON blob is the cleaner source.
 *
 * Row names carry stray trailing spaces between seasons ('Lower Castle '), so
 * everything is trimmed here rather than in each caller.
 */
export default function slopes(dom) {
  const script = select(dom, 'script#__NEXT_DATA__')[0];
  if (!script) {
    return [];
  }
  const data = JSON.parse(allText(script) || '{}');
  const body = data?.props?.pageProps?.story?.content?.body ?? [];
  const table = body.find(block => block.component === 'Slopes Table');
  return (table?.slopes ?? [])
    .map(slope => ({
      name: (slope.name ?? '').trim(),
      status: (slope.status ?? '').trim(),
      difficulty: (slope.difficulty ?? '').trim(),
      lifts: (slope.lifts ?? []).map(lift => lift.trim()).filter(Boolean)
    }))
    .filter(slope => slope.name);
}
