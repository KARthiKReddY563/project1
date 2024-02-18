const Listing=require("../models/listing");
const Review=require("../models/review.js");

module.exports.createReview=async (req,res)=>{
    let {id} = req.params;
   let listing= await  Listing.findByIdAndUpdate(id);
   let newReview=new Review(req.body.review);
  newReview.author=req.user._id;
   listing.reviews.push(newReview);
   console.log(newReview);
   await newReview.save();
   await listing.save();
   req.flash("success","New Review is created");
   console.log("new review saved");
   res.redirect(`/listings/${id}`);
  }

  module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    console.log(id)
    await Listing.findByIdAndUpdate(id, {$pull :{ reviews:reviewId}});
  let reviewdeleted= await  Review.findByIdAndDelete(reviewId);
  console.log(reviewdeleted);
  req.flash("success","Review  is deleted");
  res.redirect(`/listings/${id}`);
  
  }