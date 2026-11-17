/**
 * Secret request headers, kept out of the repository. A url descriptor in
 * resort.json may carry
 *
 *   "envHeaders": { "<Header-Name>": "<ENV_VAR_NAME>" }
 *
 * beside its plain `headers`: each named environment variable's value is sent
 * as that header. The variable is set on the host only (liftie.service
 * Environment= lines on the Pi); the repository holds the variable name and
 * never the value.
 *
 * A missing or empty variable is an ERROR, not a request without the header:
 * the fetch fails, so liftie keeps the last good board instead of publishing an
 * empty one. It is logged once per variable, by name only.
 */
const reported = new Set();

export class MissingEnvHeader extends Error {
  constructor(name) {
    super(`missing environment variable ${name} for a request header`);
    this.name = 'MissingEnvHeader';
    this.variable = name;
  }
}

export default function envHeaders(url, env = process.env) {
  const out = {};
  for (const [header, name] of Object.entries(url?.envHeaders ?? {})) {
    const value = env[name];
    if (!value) {
      if (!reported.has(name)) {
        reported.add(name);
        console.error(`liftie: ${name} is not set; ${header} cannot be sent, the fetch fails`);
      }
      throw new MissingEnvHeader(name);
    }
    out[header] = value;
  }
  return out;
}
