const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Gateway running on http://localhost:${PORT}`);
});
