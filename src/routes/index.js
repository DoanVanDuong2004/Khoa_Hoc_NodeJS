const express=require('express')
const router=express.Router()
router.use('/v1/api',require('./access/index'))
// router.get('/', (req, res, next) => {
//     const strCompress = 'Duong DZ Qua'
//     return res.status(200).json({
//         message: 'Welcome Van Duong DZ',
//         metadata: strCompress.repeat(10000)
//     })
// })
module.exports=router