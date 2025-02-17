const { log } = require("console");
const app = require("./app");
const PORT = 3055
const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with ${PORT}`)

})
// process.on('SIGINT',()=>{
//     server.close(() => {
//         console.log(`Exit Server Epress`)
//     })
// })