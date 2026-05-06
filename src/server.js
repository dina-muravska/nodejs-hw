import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHundler.js';
import { notFoundHandler } from './middleware/notFoundHundler.js';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// app.use(logger);
app.use(express.json({}));

app.use(cors());

app.use(logger);

app.use(helmet());

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
