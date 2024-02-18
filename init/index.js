const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
.then( async () => console.log('Connected!'))
.catch((err)=>{
    console.log(err);
})

const initDB=async () => {
   await Listing.deleteMany({});
   initData.data =initData.data.map((obj)=>({...obj,owner:"65d1a98e782ab8beff0756cd"}))
   await Listing.insertMany(initData.data);
   console.log("data was initizatied");
}

initDB();