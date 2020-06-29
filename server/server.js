import app from './app';
import { logger } from './config';

const { PORT = 4200 } = process.env;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});