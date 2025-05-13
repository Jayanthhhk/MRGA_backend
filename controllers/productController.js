const Firm = require('../models/Firm.model');
const Product = require('../models/Product.model')
const multer = require("multer")


const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null,'uploads/')
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+path.extname(file.originalname))
    }
  });

const path = require('path')

const uploads = multer({storage})

const addProduct = async(req,res)=>{
  try {
    const {productname,price,category,bestseller,description} = req.body

    const image = req.file?req.file.filename:undefined;

    const firmId = req.params.firmId;

    const firm =  await Firm.findById(firmId)

    if(!firm){
      return res.status(404).json({error:"No firm found"})
    }

    const product = new Product({
      productname,price,category,bestseller,description,image,firm:firm._id
    })

    const savedProduct = await product.save()
    firm.Product.push(savedProduct)

    await firm.save()

    res.status(200).json(savedProduct)
  
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'internal server error'})
  }


}

const getProductByFirm = async(req,res)=>{
  try {
    const firmId = req.params.firmId
    const firm = await Firm.findById(firmId)

    if(!firm){
      return res.status(404).json({message:"no firm found"})
    }

    const resName = firm.firmName; 

    const products = await Product.find({firm:firmId})

    res.status(200).json({resName,products})


  } catch (error) {
    console.error(error);
    res.status(500).json({error:'internal server error'})
    
  }
}

const deleteProductById = async(req,res)=>{
  try {
      
    const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndDelete(productId)

      if(!deletedProduct){
        return res.status(404).json({message:"Product not found"})
      }
  
    } catch (error) {

    console.error(error);
    res.status(500).json({error:'internal server error'})
    
  }


}

module.exports = {addProduct:[uploads.single('image'),addProduct],getProductByFirm,deleteProductById}