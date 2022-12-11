
const mongoose=require("mongoose");
const contactSchema=new mongoose.Schema(
    {
        name: { type: String, require: true },
        phone_number: { type: String, require: true },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
module.exports= mongoose.model("contact", contactSchema);

//contact Schema