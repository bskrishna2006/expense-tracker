// // const express = require("express")
// // const app = express();

// // const port = 3000;
// // const data = [
// //     {
// //         id:1,name:"Krishna",address:"aa"    },
// //     {   id:2,name:"abcd",address:"aab"  },
// //     {id:3,name:"aabb",address:"aacc"}    
// //     ];
// // app.get('/students/details',(req,res)=>{
// //     res.json(data);
// // });

// // app.get('/student/details1/',(req,res)=>{
// //     const {id} = req.query;
// //     if(id){
// //         const result = data.find((item) => {
// //             item.id === Number(id)
// //         });
// //          if(result){
// //      res.json(result.address);   
// //         }else{
// //             res.status(400).json({error: "Data not found for the given ID"});
// //         }
// //     }else{
// //         res.json(data);
// //     }
// // })
// // app.get('/students/details2/',(req,res)=>{
// //     const {name} = req.query;
// //     if(name){
// //         const result = data.find((item) => item.name === String(name));
// //         if(result){
// //             res.json(result);
// //         }else{
// //             res.status(400).json({error: "Data not found for the given name"});
// //         }
// //     }else{
// //         res.json(data);
// //     }
// // })
// // app.get('/students/details3/',(req,res)=>{
// //     const {name,id} = req.query;
// //     if(name && id){
// //         const result = data.find((item) => item.name === String(name) && item.id===Number(id));
// //         if(result){
// //             res.json(result);
// //         }else{
// //             res.status(400).json({error: "Data not found for the given name"});
// //         }
// //     }else{
// //         res.json(data);
// //     }
// // })
// // app.listen(port, () => {
// //     console.log(`Server is running at http://localhost:${port}`);
// // });

// // const express=require("express");
// // const mongoose=require("mongoose");
// // const app=express();
// // const url="mongodb://localhost:27017/mernstack";
// // mongoose.connect(url).then(()=>{
// // console.log("Database connected successfully");
// // app.listen(3001,()=>{
// //     console.log("server is running");
// // })
// // }).catch((err)=>{console.log("error")});

// // const expeseschema= new mongoose.Schema({
// //     id:{type:String,required:true}
// // });
// //Import required modules
// const http = require('http');
// const express = require('express');
// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');
// const app = express();
// const port = 3006;
// app.use(express.json());
// const mongoUrl = "mongodb://127.0.0.1:27017/Project";
// mongoose.connect(mongoUrl)
//     .then(() => {
//         console.log("Database connected successfully");
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch(err => {
//         console.log("Database connection error:", err);
//     });

// // Schema creation
// const studentSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     name: { type: String, required: true },
//     address: { type: String, default: "Not Provided" },
//     job: { type: String, required: true }
// });

// const expenseModel = mongoose.model("expense-tracker", studentSchema);

// app.get("/app/student", async (req, res) => {
//     try {
//         const expenses = await expenseModel.find();
//         res.status(200).json(expenses);
//     } catch (e) {
//         res.status(500).json({ message: "Failed to fetch expenses" });
//     }
// });
// app.get("/app/student/:id",async (req,res)=>{
//     try{
//         const {id}=req.params;
//         const details=await expenseModel.findOne({id});
//         if(id){
//             res.status(200).json(details);
//         }
//         else{
//             return res.status(404).json({message:"expense not found"});
//         }
//     }catch(e){
//         res.status(500).json({message:"Error in fetching expenses"});
//     }
// })
// app.post("/app/student", async (req, res) => {
//     try {
//         const { name, address, job } = req.body;
//         const lastStudent = await expenseModel.findOne().sort({ id: -1 }).exec();
//         const newId = lastStudent ? lastStudent.id + 1 : 1;
//         const newStudent = new expenseModel({
//             id: newId,
//             name,
//             address,
//             job
//         });
//         const saved = await newStudent.save();
//         res.status(200).json(saved);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to save student details", error });
//     }
// });
// app.put("/app/student/:id", async (req, res) => {
//     const { id } = req.params;
//     const { name, address, job } = req.body; 
//     try {
//         const updateExpense = await expenseModel.findOneAndUpdate(
//             { id }, 
//             { name, address, job }, 
//             { new: true } 
//         );
//         if (!updateExpense) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         res.status(200).json(updateExpense);
//     } catch (e) {
//         res.status(500).json({ message: "Error in updating student details", error: e.message });
//     }
// });
// /*const uri = "mongodb+srv://Krishna:<db_password>@cluster0.qggkdhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";*/


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3006;

app.use(express.json());

const mongoUrl = "mongodb://127.0.0.1:27017/Project";
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.log("Database connection error:", err);
    });

const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, default: "Not Provided" },
    job: { type: String, required: true }
});

const expenseModel = mongoose.model("expense-tracker", studentSchema);

app.get("/app/student", async (req, res) => {
    try {
        const expenses = await expenseModel.find();
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
});

app.get("/app/student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const details = await expenseModel.findOne({ id });
        if (details) {
            res.status(200).json(details);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (e) {
        res.status(500).json({ message: "Error in fetching student details", error: e.message });
    }
});

app.post("/app/student", async (req, res) => {
    try {
        const { name, address, job } = req.body;
        if (!name || !job) {
            return res.status(400).json({ message: "Name and job are required fields" });
        }
        const lastStudent = await expenseModel.findOne().sort({ id: -1 }).exec();
        const newId = lastStudent ? lastStudent.id + 1 : 1;
        const newStudent = new expenseModel({ id: newId, name, address, job });
        const saved = await newStudent.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Failed to save student details", error });
    }
});

app.put("/app/student/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, job } = req.body;
    try {
        const updateExpense = await expenseModel.findOneAndUpdate(
            { id },
            { name, address, job },
            { new: true }
        );
        if (!updateExpense) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(updateExpense);
    } catch (e) {
        res.status(500).json({ message: "Error in updating student details", error: e.message });
    }
});
