const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Welcome to the Blog');
});

app.use(require('./Router'));

app.listen(3000);