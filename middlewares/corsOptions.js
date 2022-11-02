const allowlist = [
  'https://movie.dkay.ru',
  'http://localhost:3000'];

const corsOptionsDelegate = async (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  await callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
