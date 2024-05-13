const mongoose = require("mongoose")

let mongoConnect = () => {
    console.log()
    mongoose.connect(process.env.mongoUrl).then(() => {
        console.log("Server is connected with database")
    })
}

module.exports=mongoConnect