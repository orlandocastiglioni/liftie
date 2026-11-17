import { tmpdir } from 'node:os';

const {
  CSP_REPORT_URI,
  LIFTIE_CSP_ENFORCE,
  LIFTIE_FLARESOLVERR = 'http://127.0.0.1:8191/v1',
  LIFTIE_RENDERD = '',
  LIFTIE_STATIC_HOST = '',
  // The honest agent: who is fetching, and where to read about it. No browser
  // token - a site that wants one gets a per-resort `headers` override in its
  // resort.json, never a spoofed browser string. Set LIFTIE_USER_AGENT to
  // replace it for the whole process.
  LIFTIE_USER_AGENT = 'IndiePeaks-lift-status/1.0 (+https://orlandocc.me/indiepeaks)',
  LOG_DIR = tmpdir(),
  NODE_ENV = 'development',
  OPENWEATHER_API_KEY,
  PORT = 3000,
  WEBCAMS_API_KEY
} = process.env;

process.env.SITE_URL ??= `http://localhost:${PORT}`;

const { SITE_URL } = process.env;

export {
  CSP_REPORT_URI,
  LIFTIE_CSP_ENFORCE,
  LIFTIE_FLARESOLVERR,
  LIFTIE_RENDERD,
  LIFTIE_STATIC_HOST,
  LIFTIE_USER_AGENT,
  LOG_DIR,
  NODE_ENV,
  OPENWEATHER_API_KEY,
  PORT,
  SITE_URL,
  WEBCAMS_API_KEY
};
