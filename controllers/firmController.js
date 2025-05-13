const Firm = require('../models/Firm.model')
const Vendor = require("../models/Vendor.model")
const multer = require("multer")


const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null,'uploads/')
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+path.extname(file.originalname))
    }
  });

const uploads = multer({storage})

const addFirm = async(req,res)=>{
  try {
    const {firmName,category,region,offer} =req.body
  
    const image = req.file? req.file.filename:undefined
    
    const vendor = await Vendor.findById(req.vendorId)

    if (!vendor){
      res.status(404).json({message:"vendor not found"})
    }
  
    const firm = new Firm({
      firmName,category,region,offer,image,vendor: vendor._id
    })
     
    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm)
    await vendor.save(savedFirm)
    return res.status(200).json({message:"firm added successfully"})

  } catch (error) {
    console.error(error)
    res.status(500).json({message:"internal server error"})
  }
}

const deleteFirmById = async(req,res)=>{
  try {
    const firmId = req.params.firmId
    const deletedFirm = await Firm.findByIdAndDelete(firmId)

    if (!deletedFirm){
      return res.status(404).json({message:"Firm not found"})
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({error:'internal server error'})
  }
}

module.exports = {addFirm:[uploads.single('image'),addFirm],deleteFirmById}


