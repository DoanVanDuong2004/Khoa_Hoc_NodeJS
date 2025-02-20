const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const keytokenModel = require("../models/keytoken.model");
const KeyTokenService = require("../services/keytoken.service");
const { getInfoData } = require("../utils");
const { createToKenPair } = require("../auth/authUntils");

const RoleShop = {
    SHOP: "SHOP",
    WRITE: "WRITE",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => { // ✅ Sửa để nhận `req.body` đúng cách
        try {
            console.log("Received:", { name, email, password }); // Debug dữ liệu

            // Step 1: Kiểm tra dữ liệu đầu vào
            if (!email || !password || !name) {
                return {
                    code: "xxx",
                    message: "Name, Email, and Password are required!",
                    status: "error",
                };
            }

            // Step 2: Kiểm tra email đã tồn tại chưa
            const existingShop = await shopModel.findOne({ email }).lean();
            if (existingShop) {
                return {
                    code: "xxx",
                    message: "Shop already registered!",
                    status: "error",
                };
            }

            // Step 3: Hash mật khẩu
            const passwordHash = await bcrypt.hash(password, 10);
            console.log("Hashed Password:", passwordHash); // Debug kiểm tra mật khẩu đã hash chưa

            // Step 4: Tạo shop mới
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP],
            });

            if (newShop) {
                // Step 5: Tạo privateKey & publicKey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                //     modulusLength: 4096,
                //     publicKeyEncoding: { type: "spki", format: "pem" },
                //     privateKeyEncoding: { type: "pkcs8", format: "pem" },
                // });
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')
                console.log({ privateKey, publicKey }); // Log ra để kiểm tra

                // Step 6: Lưu privateKey & publicKey vào MongoDB
                const keyStore = await KeyTokenService.createKeyToken({ userId: newShop._id , publicKey, privateKey})
                //create token pair
                const tokens = await createToKenPair({ userId: newShop._id, email }, publicKey, privateKey)
                console.log(`Create token success::`,tokens);

                return {
                    code: 201,
                    message: "Shop registered successfully!",
                    status: "success",
                    metadata: {
                        shop: getInfoData({ fildes: ['_id', 'name', 'email'], object: newShop }),tokens
                    }
                    
                };
            }
        } catch (error) {
            console.error(error); // Debug lỗi
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;
