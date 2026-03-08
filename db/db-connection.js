const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI; // ESTA ES LA CLAVE

        await mongoose.connect(url);
        console.log("Conexion exitosa");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getConnection };