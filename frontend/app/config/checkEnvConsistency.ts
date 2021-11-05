import { loadEnv } from 'vite';

const checkEnvConsistency = (mode: string): void => {
  const env = loadEnv(mode, process.cwd());
  const exampleEnv = loadEnv('example', process.cwd());

  const envFilename = mode === 'development' ? '.env' : '.env.' + mode;
  Object.keys(exampleEnv).forEach(key => {
    if (!(key in env)) {
      throw new Error(`${key} is not defined in ${envFilename}`);
    }
  });
  Object.keys(env).forEach(key => {
    if (!(key in exampleEnv)) {
      throw new Error(`${key} is not defined in .env.example`);
    }
  });
};

export default checkEnvConsistency;
