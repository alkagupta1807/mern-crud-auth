const Product = require("../model/product.model")

const createProduct=async(productData)=>{
    const product=new Product(productData);
    return await product.save()
}
const getAllProducts=async()=>{
    return await Product.find({deletedAt:null})
}

const getProductById=async(id)=>{
    return await Product.findOne({_id:id})
}
const updateProductById=async(id,updateData)=>{
    return await Product.findByIdAndUpdate(id,updateData,{new:true})

}

const findProductById=async(id)=>{
    return await Product.findById(id)

}
const saveProduct=async(product)=>{
  return await product.save()
}


const findProductsByQuery = async (query) => {
    return await Product.find(query).exec();
};




module.exports={createProduct,getAllProducts,getProductById,
    updateProductById,findProductById,saveProduct,findProductsByQuery}