const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(3005, () => {
    console.log('server running at http://localhost:3005');
});