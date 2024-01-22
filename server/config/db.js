
const mongoose = require('mongoose');
require('dotenv').config()

module.exports = async () => {
    try {
        const mongoDBUrl = "mongodb+srv://mtankmtank265:h5zwfDSscQFFA987@cluster0.dzvbpdc.mongodb.net/?retryWrites=true&w=majority"
        const connect = await mongoose.connect(process.env.MongoDB_Uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log(`MongoDB connected : ${connect.connection.host}`);

    } catch (err) {
        console.error('database not connected')
        process.exit(1);
    }
}