import dotEnv from 'dotenv';

dotEnv.config();

function normalizePort() {
  const port = process.env.PORT || '';
  const normalPort = parseInt(port, 10);
  if (isNaN(normalPort)) {
    return false;
  }

  return normalPort;
}

function getEnvVariables(): EnvironmentVariables {
  let apiPath = process.env.API_PATH;
  const port = normalizePort() || 4444;

  const databaseUrl = process.env.MONGO_URL;
  if (!databaseUrl) {
    console.log(`Invalid database url`);
    process.exit(1);
  }

  if (!apiPath) {
    apiPath = '/api';
  }

  const appUrl = `http://localhost:${port}/`;

  return {
    port,
    appUrl,
    apiPath,
    databaseUrl,
  };
}

export default getEnvVariables();
