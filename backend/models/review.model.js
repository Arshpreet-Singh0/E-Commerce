import moongoose from 'mongoose'

const reviewSchema = moongoose.Schema({
    user : {
        type : moongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    product : {
        type : moongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    },
    review : {
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        max : 5,
        min : 1,
        required : true,
    }
},{ timestamps: true })

const Review = moongoose.model("Review", reviewSchema);

export default Review;