//mongodb is schemaless but mongoose can specify schemas for more safety
const { model, Schema} = require("mongoose");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
})

module.exports = model('User', userSchema)