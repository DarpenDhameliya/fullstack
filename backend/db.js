const mongoose = require('mongoose');
const mongourl = 'mongodb://127.0.0.1:27017/sstpldemo'

const mongoconnect = async () => {
    try {
        mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
            console.log('MongoDB Connected...');
        });
    } catch (err) {
        console.error('============>', err);

    }
}

module.exports = mongoconnect;