const express = require('express');
const app = express();

const PORT = 4001;

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(PORT, () => {
    console.log(`The server is on http://localhost:${PORT}`);
})