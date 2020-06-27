const express = require('express');
const Employee = require('../models/Employee')
const router = express.Router();

router.post('/send-data',(req,res)=>{
const {name,email,phone,salary,picture,position} = req.body;
const employee = new Employee({
    name,
    email,
    phone,
    salary,
    picture,
    position
})
    employee.save()
            .then(data=>{
                res.status(200).json({result:data})
            })
            .catch(err=>console.log(err))
})

router.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>console.log(err))
})

router.delete('/delete',(req,res)=>{
    // console.log(req.body.id)
    Employee.findByIdAndRemove(req.body.id)
            .then(data =>{
                console.log(data)
                res.send(data)
            })
            .catch(err=>{
                console.log(err)
            })
})

router.put('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    }).then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router