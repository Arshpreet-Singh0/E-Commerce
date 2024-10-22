import Product from "../models/product.model.js";

export const listProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images, brand, subcategory } = req.body;
    const id = req.id;
    
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !images ||
      images.length === 0 ||
      !brand ||
      !subcategory ||
      !stock
    ) {
        return res.status(400).json({
            message: "All fields are required",
            success : false, 
            });
    }

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

    // console.log(product);
    

    return res.status(200).json({
        message : 'Product created succfully',
        success : true,
    })
  } catch (error) {
    console.log(error);
    
  }
};

export const updateProductInfo = async(req, res)=>{
    try {
        const { name, description, price, category, stock, images, brand } = req.body;
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

        const response = await  product.save();
        console.log(response);

        return res.status(200).json({
            message : 'Product updated successfully.',
            success : true,
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllProduct = async(req, res)=>{
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
        
    }
}

export const getProductById = async(req, res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id).populate({
            path : 'category',
            // strictpopulate : false,
        }).populate({
            path : 'reviews'
        });
        console.log(product);
        

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
        
    }
}

export const getCategoryProducts = async(req, res)=>{
    try {
        const {category} = req.params;

        const products = await Product.find({category}).populate({
            path : 'category'
        });;

        return res.status(200).json({
            products,
            success : true,
        })
    } catch (error) {
        console.log(error);
        
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
    }
}

export const getProductBySubCategory = async(req, res)=>{
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
    }
}

export const deleteProduct = async(req, res)=>{
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
        
    }
}

