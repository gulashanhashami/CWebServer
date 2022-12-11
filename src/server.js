
const express= require("express");
const app =express();
const connect = require('./configs/db');
const contactController=require("./controllers/contact.controller");

//using cors to allow the load the data on browser
const cors= require("cors");
const path =require("path");
const corsOptions = { //* means universal
    origin: '*',  
    credentials: true,   
    optionSuccessStatus: 200,  
  }                          
  app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/contacts", contactController);

const accountSid="ACe18f5b5191fa39f09a764170734de853";
const authToken= "7329485be5237548963e44917f655060";
const twilioNumber= "+15139605158";
const client= require("twilio")(accountSid, authToken);

// code for post the data 
app.post("/sendotp", (req, res)=>{
    try {
        const {recipient, textMessage} =req.query
    client.messages.create({
        body : textMessage,
        to : "+91"+recipient,
        from : twilioNumber
    })
    return res.status(201).send(textMessage);
    } catch (error) {
        return res.status(500).send(error.message);
    }
   
})

const apiKey ="SKbac9539397a7163d6f450cf546afdcd6";
const apiSecret = "oKd6VofhpBarVSlB1oazrr87eDzb7Uul";
const clients = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });
// code for get the data
app.get("/sendotp", (req, res)=>{
  try {
    clients.messages.list({ Page: 0, PageSize: 10 }, function (err, data) {
        res.status(200).send({ message: "Success", data });
});
  } catch (error) {
    return res.status(500).send(error.message);
  }
   
  

})

// code for listening port
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log(`listening on port ${port}`);
});