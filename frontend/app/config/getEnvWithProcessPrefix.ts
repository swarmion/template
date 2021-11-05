import { loadEnv } from 'vite';

const getEnvWithProcessPrefix = (mode: string): Record<string, string> => {
  const env = loadEnv(mode, process.cwd());

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {},
  );

  return envWithProcessPrefix;
};

export default getEnvWithProcessPrefix;
