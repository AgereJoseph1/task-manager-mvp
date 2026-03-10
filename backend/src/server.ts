import http from 'http';
import app from './app';
import { loadEnv } from './config/env';

const env = loadEnv();

const PORT = env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
