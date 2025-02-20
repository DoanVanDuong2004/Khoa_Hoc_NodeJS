const mongoose = require("mongoose");
const DOCUMEBT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'
const keyTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Liên kết với bảng Shop
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String], // Nếu bạn muốn lưu Refresh Tokens
      default: [],
    },
  },
  {  timestamps:true,
    collection:COLLECTION_NAME }
);

module.exports = mongoose.model(DOCUMEBT_NAME, keyTokenSchema);
