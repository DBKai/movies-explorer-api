const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rateLimiter');
const { indexRouter } = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptionsDelegate } = require('./middlewares/corsOptions');
const { PORT, DATABASE_ADDRESS } = require('./configuration');

const app = express();

app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

async function main() {
  await mongoose.connect(DATABASE_ADDRESS, {
    useNewUrlParser: true,
  });

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
