const Listing=require("../models/listing");

//index route
module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings})
}
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
 }
 
//show Listing

module.exports.showListing= async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
                         .populate({
                         path:"reviews",
                         populate:{
                            path:"author"
                         },
                      })
                         .populate("owner");
    console.log(listing);
    if(!listing){
        req.flash("error","listing you requested does not exist");  
       res.redirect("/listings",{});
 }
    res.render("listings/show.ejs",{listing});
 
 }

 //createNewListing

 module.exports.createListing=async(req,res,next)=>{
   let url=req.file.path;
   let filename=req.file.filename;
  
    const newListing= new Listing(req.body.listing);
    newListing.image={url,filename};
       newListing.owner=req.user._id;
      await newListing.save();
      req.flash("success","New Listing is created");
       res.redirect("/listings")
   
   }
module.exports.renderEditForm= async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
     req.flash("error","listing you requested does not exist");      
     res.redirect("/listings")
 }
    res.render("listings/edit.ejs",{listing})
 
 }

 module.exports.updateListing= async (req,res)=>{
    let {id} = req.params;
  let listing=await  Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file !="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename};
   await listing.save();
  }
  
  req.flash("success"," Listing is updated");
  res.redirect(`/listings/${id}`);
 //   res.redirect("/listings")
 }
 module.exports.destroyListing=async(req,res)=>{
    let {id} = req.params;
  let deleted= await  Listing.findByIdAndDelete(id);
  console.log(deleted);
  req.flash("success"," Listing is deleted");
  res.redirect("/listings")
 
 }
 