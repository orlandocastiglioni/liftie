// Catamount runs the same Joomla com_dispatchsync conditions component as
// Berkshire East (same owner group), so the row markup is identical.
// The human page /winter/the-mountain/mountain-conditions only embeds
// <iframe src="/lift-status?tmpl=component">, which is what dataUrl points at.
//
// row: <div class="col-03"><i class="fas fa-check|fa-remove"></i>NAME</div>
export default {
  selector: '#collapse1 .col-03',
  parse: {
    name: '1',
    status: {
      child: '0',
      attribute: 'class',
      // 'remove' is not in the central status vocabulary, map both icons here
      regex: /fa-(check|remove)/,
      fn: s => {
        switch (s) {
          case 'check':
            return 'open';
          case 'remove':
            return 'closed';
          default:
            return 'unknown';
        }
      }
    }
  }
};
