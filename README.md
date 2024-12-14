# E-Commerce Website

An e-commerce platform that provides a seamless shopping experience with features like user management, product browsing, cart functionality, payment integration, and order tracking. The project is divided into two main directories: `frontend` and `backend`.

---

## 🗂 Project Structure

### Backend
The `backend` folder contains the server-side code, which handles API endpoints, database operations, authentication, and payment integration.

### Frontend
The `frontend` folder contains the client-side code, built with modern technologies to deliver a dynamic and responsive user interface.

---

## 🔧 Environment Variables

### Backend `.env`
To configure the backend, create a `.env` file in the `backend` directory with the following keys:

```env
PORT=8080
MONGO_URI=your_mongo_db_connection_string
SECRET_KEY=your_secret_key

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

NODE_MAILER_USER=your_email_address
NODE_MAILER_PASS=your_email_password
```
### Frontend `.env`
To configure the Frontend, create a `.env` file in the `frontend` directory with the following keys:

```env
VITE_API_URL=http://localhost:8080
VITE_USER_API_END_POINT=http://localhost:8080/api/v1/user
VITE_REVIEW_API_END_POINT=http://localhost:8080/api/v1/review
VITE_CART_API_END_POINT=http://localhost:8080/api/v1/cart
VITE_PRODUCT_API_END_POINT=http://localhost:8080/api/v1/product
VITE_CATEGORIES_API_END_POINT=http://localhost:8080/api/v1/category
VITE_PAYMENT_API_END_POINT=http://localhost:8080/api/v1/payment
VITE_ORDER_API_END_POINT=http://localhost:8080/api/v1/order

APP_URL=http://localhost:5173

```
## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (running locally or a cloud instance)
- **Vite** (for frontend development)
- **Cloudinary Account** (for media storage)
- **Razorpay Account** (for payment gateway)

---

### Installation

#### Backend
Starting `backend`:
   ```bash
   cd backend
   npm install
   npm run dev
  ```
Starting `frontend`:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
## 📂 API Endpoints

### User
- **Base URL:** `http://localhost:8080/api/v1/user`

### Reviews
- **Base URL:** `http://localhost:8080/api/v1/review`

### Cart
- **Base URL:** `http://localhost:8080/api/v1/cart`

### Products
- **Base URL:** `http://localhost:8080/api/v1/product`

### Categories
- **Base URL:** `http://localhost:8080/api/v1/category`

### Payments
- **Base URL:** `http://localhost:8080/api/v1/payment`

### Orders
- **Base URL:** `http://localhost:8080/api/v1/order`

---

## 🛠 Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Vite
- **Payment Gateway:** Razorpay
- **Media Storage:** Cloudinary
- **Email Services:** NodeMailer

---

## 🌟 Features

- **User Authentication:** Secure login and registration
- **Product Management:** View, search, and filter products
- **Cart Functionality:** Add, update, and remove items from the cart
- **Secure Payments:** Integrated Razorpay for seamless transactions
- **Order Management:** Track order history and details
- **Admin Dashboard:** Manage users, products, and orders (future scope)

---

## 👩‍💻 Contributions

Contributions are welcome! Feel free to submit a pull request or raise issues for feature requests and bug fixes.

---

## 📧 Contact

For queries, please email: **arshsomal100@gmail.com**
