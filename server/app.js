const express = require('express')
const mongoose = require('mongoose');
const app = express();

const mongoUri = "mongodb+srv://anand:12345@cluster0-xnhyk.mongodb.net/EmployeeApp?retryWrites=true&w=majority"
mongoose.connect(mongoUri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    console.log(err)
    else
    console.log('Databased connection saved')
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require('./controller/routes'))


const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})