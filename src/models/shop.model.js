//dùng lệnh !dmbg
const { model, Schema, Types } = require('mongoose'); // Erase if already required
const { type } = require('os');
const DOCUMEBT_NAME = 'Shop'
const COLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    password: {
        type: String,
        required: true,
    },
    verfify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps:true,
    collection:COLECTION_NAME
    l̥
});

//Export the model
module.exports = mongoose.model('User', userSchema);