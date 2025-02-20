const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR',
    ADMin: 'ADMIN'  

}

class AccessService {
    static signUp = async (name, email, password) => {
        try {
            //step1:check email ton tai
            const holdelShop = await shopModel.findOne({ email }).lean()
            if (holdelShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered!',

                }
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles:[RoleShop.SHOP]
            })

            if (newShop) {
                //create privateKey, publicKey
                const {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096
                })

                console.log({privateKey,publicKey});//save colection StoreKey
                
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}
module.exports = AccessService