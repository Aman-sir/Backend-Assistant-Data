const mongoose = require("mongoose")

const assistantSchema = new mongoose.Schema({
    "name": { type: String, require: true },
    "id": { type: Number },
    "email": { type: String, unique: true },
    "mobile": { type: String },
    "city": { type: String },
    "state": { type: String },
    "country": { type: String },
    "role": { type: String },
    "department": { type: String },
    "salary": { type: String },

})

const assistantModal=mongoose.model("Assitant",assistantSchema)

module.exports=assistantModal