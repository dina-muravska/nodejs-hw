import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';
import helmet from 'helmet';
// import { connectMongoDB } from './db/connectMongoDB.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// app.use(logger);
app.use(express.json({}));
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
