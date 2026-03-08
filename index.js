require('dotenv').config();
const express = require('express');
const {getConnection} = require('./db/db-connection');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
getConnection();
app.use(express.json());

app.use('/genero', require('./routes/genero'));
app.use('/director', require('./routes/director'));
app.use('/productora', require('./routes/productora'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});