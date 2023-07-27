const os = require('os');
const process = require('process');
const mongoose = require('mongoose')
const _SECONDS = 5000

const countConnect = () => {
    const numberConnect = mongoose.connect.length
    console.log(`Number of connections: ${numberConnect}`);
}

const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connect.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss
        // Example maximum number of connections based on number osf cores;
        const maxConnections = numCores * 5;
        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        if(numConnection > maxConnections) {
            console.log(`Connection overload deleted`);
        }
    }, _SECONDS)
}

module.exports = {
    checkOverLoad,
    countConnect
}