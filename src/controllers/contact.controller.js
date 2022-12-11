const path= require("path");
const express=require("express");
const Contact=require("../models/contact.model")
const router=express.Router();
//post the data
router.post("", async(req, res)=>{
    try {
        const contact= await Contact.create(req.body);
        return res.status(201).send(contact);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get the data
router.get("", async(req,res)=>{
    try {
        
        const contacts=await Contact.find().lean().exec();
        return res.status(200).send(contacts); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get single data by id
router.get("/:id", async (req, res) => {
    try {
   
        const contact = await Contact.findById(req.params.id).lean().exec();
  
        return res.status(200).send({ contacts: contact });

    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports=router;

//handle CRUD operation