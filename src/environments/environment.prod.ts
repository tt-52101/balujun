import { environment as baseEnv } from "./environment";

export const environment = Object.assign({}, baseEnv, {
  SERVER_URL: `./`,
  production: true,
  useHash: true,
  hmr: false,
});
