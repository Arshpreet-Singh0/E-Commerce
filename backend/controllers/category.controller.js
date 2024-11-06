import Category from "../models/category.model.js";

export const cretaeCategory = async(req, res, next) => {
  try {
    const {name, parentCategory, image} = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const category = await Category.findOne({name:name});
    

    if(category){
      return res.status(400).json({
        message: "Category already exists",
        success : false,
      })
    }

    const newCategory = await Category.create({
      name,
      parentCategory,
      image,
    });

    // console.log(newCategory);
    

    return res.status(200).json({
      message: "Category created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllParentCategories = async(req, res, next) => {
    try {
        
        const categories = await Category.find({parentCategory : null});

        return  res.status(200).json({
            categories,
        })
    } catch (error) {
      next(error);        
    }
}

export const  getSubCategories = async(req, res, next) => {
    try {
        const {parentCategory}  = req.params;

        const subCategories = await Category.find({parentCategory});

        res.status(200).json({
            subCategories,
        })
    } catch (error) {
      next(error);
    }
}
