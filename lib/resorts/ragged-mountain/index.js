// rebuilt (2026) PGRI WordPress theme: the old /Slopes/ page 301s to
// /mountain-report-cams/; lifts live in a single server-rendered table
// <section id="lifts"> ... <tr>
//   <td data-title="Lift Name">Summit Six Express</td>
//   <td data-title="Occupancy"><img .../occupancy.svg> 6</td>
//   <td data-title="Status" class="open">open</td>
//   <td data-title="Hours of Operation"><span>...</span></td>
// </tr>
export default {
  selector: 'section#lifts table tbody tr',
  parse: {
    name: 0,
    status: 2
  }
};
