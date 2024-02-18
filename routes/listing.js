const  express = require('express')
const   router=express.Router()

const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing");
const listingController=require("../controller/listing.js")
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");


router
 .route("/")
 .get(wrapAsync(listingController.index)) // all listings
 .post(validateListing,isLoggedIn, wrapAsync(listingController.createListing))//posting new listing
// new route
 router.get("/new",isLoggedIn,listingController.renderNewForm);
 router
 .route("/:id")
 .get(wrapAsync(listingController.showListing)) // show route
 .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))//update route
 .delete(isLoggedIn,isOwner,wrapAsync( listingController.destroyListing)) //delete route

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))



module.exports=router;