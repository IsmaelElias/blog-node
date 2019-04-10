const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./routes'));

app.get('/', (req, res) => {
    return res.send('Welcome to the Blog');
});

app.listen(3000);