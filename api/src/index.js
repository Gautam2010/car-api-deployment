const express = require('express');
const connectDB = require('./db');
const fs = require('fs');

const app = express();
const PORT = 3000;

const carSchema = new require('mongoose').Schema({
    name: String,
    brand: String,
    color: String,
    cost: Number,
    features: [String],
});

const Car = require('mongoose').model('Car', carSchema);

app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

app.listen(PORT, async () => {
    await connectDB();

    const count = await Car.countDocuments();
    if (count === 0) {
        const carsData = JSON.parse(fs.readFileSync('src/cars.json'));
        await Car.insertMany(carsData);
        console.log('Inserted default car data.');
    }

    console.log(`Server running at http://localhost:${PORT}`);
});
