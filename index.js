const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const mongoConnect = require("./database")
const assistantModal = require("./models/assitantModel")
const dotenv = require('dotenv')


const app = express()
dotenv.config()

mongoConnect()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.status(200).json("Backend Application Server")
})


app.get("/assistant", async (req, res) => {
    let data = await assistantModal.find({})

    if (data.length > 0) {
        res.status(200).json(data)
    }
    res.status(500).json("Internal Server Error")
})


app.get("/assistant/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    try {
        let assistantData = await assistantModal.findById(id)
        res.status(200).json(assistantData)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }

})


app.post("/assistant", async (req, res) => {
    let data = req.body
    let email = data.email
    try {
        assistantModal.findOne({ email }).then((emp) => {

            if (emp == null || emp.length == 0) {
                assistantModal.create(data).then((savedData) => {
                    res.status(200).json(savedData)
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                res.status(200).send("Assistant Data is not saved")
            }

        })
    } catch (error) {
        res.status(500).json("Internal Server Error")

    }
})



app.put("/assistant/:id", async (req, res) => {
    let id = req.params.id
    let body = req.body

    try {
        let data = assistantModal.findById(id)
        if (data == null || data.length == 0) {
            res.status(200).json("Assitant Not Exists")
        }
        else {

            assistantModal.findByIdAndUpdate(id,body).then(()=>{
                res.status(200).json("Successfully Updated")
            }).catch((err)=>{
                console.log(err)
                res.status(200).json("Data is Not Updated")
            })

        }

    } catch (error) {
        res.status(500).json("Internal Server Error")

    }
})



app.delete("/assistant/:id",(req,res)=>{
let id=req.params.id
try {
    assistantModal.findById(id).then((data)=>{
        if(data.length!=0 || data!=null){
            assistantModal.findByIdAndDelete(id).then(() => {
                res.status(200).json("Assistant Data is Deleted Successfully")
            }).catch(()=>{
                res.status(200).json("Assistant is Not Deleted")
            })
        }

    }).catch(()=>{
        res.status(200).json("Assitant is not Found")
    })
    
} catch (error) {
    res.status(500).json("Internal Server Error")

    
}
})


app.listen(80, () => {
    console.log("Server is listening at http://localhost")
})