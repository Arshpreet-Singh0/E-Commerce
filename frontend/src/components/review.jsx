// import React, { useState } from "react";
// import axios from "axios";
// import { FaRegUserCircle } from "react-icons/fa";
// import { REVIEW_API_END_POINT } from "../utils/constant";
// import Star from "./Star";

// const ReviewComponent = ({ reviews }) => {
//   const [reviewList, setReviewList] = useState(reviews || []);
//   const [newReview, setNewReview] = useState("");

//   const handleSubmit = async () => {
//     if (newReview.trim()) {
//       // Send new review to the API
//       try {
//         const response = await axios.post(`${REVIEW_API_END_POINT}/create`, { text: newReview });
//         setReviewList([...reviewList, response.data]);
//         setNewReview("");
//       } catch (error) {
//         console.error("Error adding new review", error);
//       }
//     }
//   };
//   const daysAgoFunction = (mongoTime) => {
//     const createdAt = new Date(mongoTime);
//     const currentTime = new Date();
//     const timeDiff = currentTime - createdAt;

//     return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
//   };

//   return (
//     <div className=" w-full px-10 py-8">
//       <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
//         LOGO
//       </div>
//       <div className="mt-4">
//         <h1 className="text-lg text-gray-700 font-semibold">Product Reviews</h1>
//         <div className="flex gap-4 overflow-hidden">
//           {reviewList.length > 0 ? (
//             reviewList.map((review, index) => (
//               <div
//                 key={index}
//                 className="mt-4 border border-gray-600 rounded-md p-2 w-56"
//               >
//                 <div className="flex mt-2 ">
//                   {/* Star icons for rating */}
//                   <span className="text-yellow-400"><Star stars={review.rating}/></span>
//                 </div>
//                 <p className="mt-2 text-md text-gray-600">{review.review}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <div className="text-sm font-semibold flex items-center">
//                       <FaRegUserCircle className="mr-1" /> {review?.user?.name}
//                     </div>
//                     <div className="font-normal self-end">
//                       {daysAgoFunction(review?.createdAt) == 0
//                         ? "Today"
//                         : `${daysAgoFunction(review?.createdAt)} days ago`}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-md text-gray-600 mt-4">No reviews available.</p>
//           )}
//         </div>
//         {/* Textbox and Submit button for adding new reviews */}
//         <div className="mt-6">
//           <textarea
//             value={newReview}
//             onChange={(e) => setNewReview(e.target.value)}
//             placeholder="Write your review here..."
//             className="w-full p-2 border rounded-md"
//           />
//           <button
//             onClick={handleSubmit}
//             className="mt-4 p-2 bg-yellow-500 text-white rounded-md"
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewComponent;
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
  const fetch = async () =>{
    console.log("hello")
    const res = await axios.get(`http://localhost:8080/api/v1/product/get/${productId}`);
    setReviewList(res.data.product.reviews)

  }
  const handleSubmit = async () => {
  if (!user) {
    navigate('/sign-in');
    return;
  }
  if (newReview.trim() && newRating > 0) {
    try {
      console.log(productId);
      const response = await axios.post(
        `${REVIEW_API_END_POINT}/create/${productId}`,
        {
          review: newReview, // Changed 'text' to 'review' to match backend
          rating: newRating,
        },
        {
          withCredentials: true,
        }
      );
      // setReviewList([...reviewList, response.data]);
      // setNewReview("");
      // setNewRating(0);
      message.success("Review added successfully");
      fetch()
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
        console.log()
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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {reviewList.length > 0 ? (
      reviewList.map((review, index) => (
        <div
          key={index}
          className="border border-gray-600 rounded-md p-4 w-full"
        >
          <div className="flex mt-2">
            {/* Star icons for rating */}
            <span className="text-yellow-400">
              <Star stars={review.rating} />
            </span>
          </div>
          <p className="mt-2 text-md text-gray-600">{review.review}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm font-semibold flex items-center">
              <FaRegUserCircle className="mr-1" /> {review?.user?.name}
            </div>
            <div className="font-normal self-end">
              {daysAgoFunction(review?.createdAt) === 0
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
