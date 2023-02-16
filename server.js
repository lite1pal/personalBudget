const express = require('express');
const app = express();

const PORT = 4001;

const apiRouter = require('./routes/api');
app.use('/api/envelopes', apiRouter);

app.listen(PORT, () => {
    console.log(`The server is on http://localhost:${PORT}`);
})