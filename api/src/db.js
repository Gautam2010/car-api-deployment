const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
