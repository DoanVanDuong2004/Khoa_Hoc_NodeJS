const { default: mongoose } = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000
//count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of conncection :: ${numConnection}`);

}
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //maxium number of connections
        const maxConnection = numCores * 5;
        console.log(`Active connections:${numConnection}`);
        console.log(`Memory usage:=${memoryUsage / 1024 / 1024} MB`);


        if (numConnection > maxConnection) {
            console.log(`Connection overload detected`)

        }
    }, _SECONDS)//Monitor every 5 seconds
}
module.exports = { countConnect, checkOverload }