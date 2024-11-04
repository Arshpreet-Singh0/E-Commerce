import React, { useState } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { REVIEW_API_END_POINT } from "../utils/constant";
import Star from "./Star";
import { Input, Button, Modal, Rate, message } from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

const ReviewComponent = ({ reviews, productId }) => {
  const [reviewList, setReviewList] = useState(reviews || []);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    if (newReview.trim() && newRating > 0) {
      try {
        console.log(productId)
        const response = await axios.post(`${REVIEW_API_END_POINT}/create/${productId}`, {
          text: newReview,
          rating: newRating,
        });
        setReviewList([...reviewList, response.data]);
        setNewReview("");
        setNewRating(0);
        message.success("Review added successfully");
      } catch (error) {
        console.error("Error adding new review", error);
        message.error("Failed to add review");
      }
    } else {
      message.warning("Please add a review and rating.");
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setEditedText(review.text);
    setEditedRating(review.rating);
  };

  const handleUpdate = async () => {
    if (editingReview) {
      try {
        
        const response = await axios.put(`${REVIEW_API_END_POINT}/update/${productId}`, {
          text: editedText,
          rating: editedRating,
        });
        const updatedReviews = reviewList.map((review) =>
          review._id === editingReview._id ? response.data : review
        );
        setReviewList(updatedReviews);
        setEditingReview(null);
        message.success("Review updated successfully");
      } catch (error) {
        console.error("Error updating review", error);
        message.error("Failed to update review");
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
    <div className="w-full px-10 py-8">
      <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
        LOGO
      </div>
      <div className="mt-4">
        <h1 className="text-lg text-gray-700 font-semibold">Product Reviews</h1>
        <div className="flex gap-4 overflow-hidden flex-wrap">
          {reviewList.length > 0 ? (
            reviewList.map((review) => (
              <div key={review._id} className="mt-4 border border-gray-600 rounded-md p-2 w-56">
                <div className="flex mt-2">
                  <span className="text-yellow-400"><Star stars={review.rating}/></span>
                </div>
                <p className="mt-2 text-md text-gray-600">{review.text}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm font-semibold flex items-center">
                    <FaRegUserCircle className="mr-1" /> {review?.user?.name}
                  </div>
                  <div className="font-normal self-end">
                    {daysAgoFunction(review?.createdAt) === 0 ? "Today" : `${daysAgoFunction(review?.createdAt)} days ago`}
                  </div>
                </div>
                {user && user._id === review.user._id && (
                  <Button type="link" onClick={() => handleEdit(review)}>
                    Edit
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-md text-gray-600 mt-4">No reviews available.</p>
          )}
        </div>

        <div className="mt-6">
          <Rate value={newRating} onChange={setNewRating} />
          <Input.TextArea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
            className="mb-2"
          />
          <Button type="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>

        <Modal
          title="Edit Review"
          visible={!!editingReview}
          onOk={handleUpdate}
          onCancel={() => setEditingReview(null)}
        >
          <Rate value={editedRating} onChange={setEditedRating} />
          <Input.TextArea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ReviewComponent;
