const keytokenModel = require("../models/keytoken.model")
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return tokens;
        } catch (error) {
            return error
        }
    }
}
module.exports = KeyTokenService