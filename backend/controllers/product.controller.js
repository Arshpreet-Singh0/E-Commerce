import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const listProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, brand, subcategory } = req.body;
    if (
          !name ||
          !description ||
          !price ||
          !category ||
          !brand ||
          !stock ||
          !req.files ||
          req.files.length===0
        ) {
            return res.status(400).json({
                message: "All fields are required",
                success : false, 
                });
        }
        const id = req.id;
        const filesDataUri = req.files.map((file)=>{
            return getDataUri(file)
        })
    
    const uploadPromises = filesDataUri.map((dataUri) =>
        cloudinary.uploader.upload(dataUri.content, { folder: 'E-Commerce' })
      );
  
      // Wait for all uploads to complete
      const uploadedFiles = await Promise.all(uploadPromises);
      
      const images = uploadedFiles.map((data)=>{
        return {url:data.secure_url, public_id:data.public_id};
      })

    //   console.log('images : ', images);
      
      

    const product = await Product.create({
        created_by : id,
        name,
        description,
        price,
        category,
        subcategory,
        stock,
        images,
        brand,
    });

    return res.status(200).json({
        message : 'Product created succfully',
        success : true,
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProductInfo = async(req, res, next)=>{
    try {
        const { name, description, price, category, stock, images, brand , subcategory} = req.body;
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product){
            return res.status(400).json({
                message : 'Product does not exist.',
                success : false,
            })
        }

        if(name)  product.name = name;
        if(description)  product.description = description;
        if(price)  product.price = price;
        if(category)  product.category = category;
        if(stock)  product.stock = stock;
        if(images)  product.images = images;
        if(brand)  product.brand = brand;
        if(subcategory) product.subcategory = subcategory;

        await product.save();

        return res.status(200).json({
            message : 'Product updated successfully.',
            success : true,
        })
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllProduct = async(req, res, next)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };
        const products = await Product.find(query).populate({
            path : 'category'
        }).populate({
            path : 'reviews'
        });

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getProductById = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id).populate({
            path : 'category',
            // strictpopulate : false,
        }).populate({
            path : 'reviews',
            populate : {
                path : 'user'
            }
        }).populate({
            path : 'subcategory',
            strictpopulate : false,
        });
        // console.log(product);
        

        if(!product){
            return res.status(400).json({
                message : 'Product does not exist',
                success : false,
            })
        }

        return res.status(200).json({
            product,
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getCategoryProducts = async(req, res, next)=>{
    try {
        const {name} = req.params;
        const category = await Category.findOne({name});
         
        const products = await Product.find({category:category._id});        

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getProductByBrand = async(req, res)=>{
    try {
        const {brand} = req.params;

        const products = await Product.find({brand});

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getProductBySubCategory = async(req, res, next)=>{
    try {
        const {subcategory} = req.params;

        const products = await Product.find({subcategory}).populate({
            path : 'subcategory'
        });;

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteProduct = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const response = await Product.findByIdAndDelete(id);

        if(!response){
            return res.status(400).json({
                message : 'Failed to delete product.',
                success : false,
            })
        }


        return res.status(200).json({
            message : 'Product deleted successfully.',
            success : true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAdminProducts = async(req, res, next)=>{
    try {
        const created_by = req.id;
        const products = await Product.find({created_by});

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        next(error);
    }
}