const mongoose = require('mongoose')
const connectString = `mongodb://localhost:27017/ShopDev`
mongoose.connect(connectString).then(_ => console.log(`Conect Mongodb Success`)).catch(err => console.log(`Error conect`))
if (1 === 1) {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })
}
module.exports = mongoose