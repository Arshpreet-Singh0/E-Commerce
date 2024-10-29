import React, { useState } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { REVIEW_API_END_POINT } from "../utils/constant";
import Star from "./Star";

const ReviewComponent = ({ reviews }) => {
  const [reviewList, setReviewList] = useState(reviews || []);
  const [newReview, setNewReview] = useState("");

  const handleSubmit = async () => {
    if (newReview.trim()) {
      // Send new review to the API
      try {
        const response = await axios.post(`${REVIEW_API_END_POINT}/create`, { text: newReview });
        setReviewList([...reviewList, response.data]);
        setNewReview("");
      } catch (error) {
        console.error("Error adding new review", error);
      }
    }
  };
  const daysAgoFunction = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div className=" w-full px-10 py-8">
      <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
        LOGO
      </div>
      <div className="mt-4">
        <h1 className="text-lg text-gray-700 font-semibold">Product Reviews</h1>
        <div className="flex gap-4 overflow-hidden">
          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <div
                key={index}
                className="mt-4 border border-gray-600 rounded-md p-2 w-56"
              >
                <div className="flex mt-2 ">
                  {/* Star icons for rating */}
                  <span className="text-yellow-400"><Star stars={review.rating}/></span>
                </div>
                <p className="mt-2 text-md text-gray-600">{review.review}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm font-semibold flex items-center">
                      <FaRegUserCircle className="mr-1" /> {review?.user?.name}
                    </div>
                    <div className="font-normal self-end">
                      {daysAgoFunction(review?.createdAt) == 0
                        ? "Today"
                        : `${daysAgoFunction(review?.createdAt)} days ago`}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-md text-gray-600 mt-4">No reviews available.</p>
          )}
        </div>
        {/* Textbox and Submit button for adding new reviews */}
        <div className="mt-6">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-yellow-500 text-white rounded-md"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
