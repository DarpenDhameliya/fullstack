const mongoose = require('mongoose');
// const mongourl = 'mongodb://127.0.0.1:27017/sstpldemo'
const mongourl = 'mongodb+srv://darpensstpl:BnrKB3DBCeEiWC2x@cluster0.udjynea.mongodb.net/?retryWrites=true&w=majority'


const mongoconnect = async () => {
    try {
        console.log('enter')
        mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName:'sstpl_node'
        }, () => {
            console.log('MongoDB Connected...');
        });
    } catch (err) {
        console.error('============>', err);
    }
}

module.exports = mongoconnect;