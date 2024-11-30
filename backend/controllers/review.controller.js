import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

export const postReview = async(req, res, next)=>{
    try {
        const user = req.id;
        const {product} = req.params;
        const {review, rating} = req.body;
        if(!review || !rating){
            return res.status(400).json({message: "All fields are requiered"});
        }

        const prod = await Product.findById(product);
        

        if(!prod){
            return res.status(400).json({
                message : 'Product doest not exist',
                success : false,
            });
        }
        const respone = await Review.create({
            user,
            product,
            review,
            rating,
        });
        const allReviews = await Review.find({product});
        const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRatings / allReviews.length;
        prod.ratings = averageRating;

        prod.reviews.push(respone._id);

        await prod.save();


        return res.status(200).json({
            message : 'Review created successfully',
            success : true,
        });


    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateReview  = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const user = req.id;

        const {review, rating} = req.body;

        const rev = await Review.findOne({_id:id, user});

        if(!rev){
            return res.status(404).json({
                message : 'Review not found',
                success : false,
            })
        }

        if(review)  rev.review = review;
        if(rating)  rev.rating = rating;

        await rev.save();

        return res.status(200).json({
            message : 'Review updated successfully',
            success : true,
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteReview = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const user = req.id;

        const rev = await Review.findOneAndDelete({_id:id, user});
        await Product.findByIdAndUpdate(rev.product, {$pull : {reviews : id}});

        return res.status(200).json({
            message : 'Review deleted successfully',
            success : true,
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}
