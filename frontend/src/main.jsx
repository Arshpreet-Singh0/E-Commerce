import { render } from "preact";
import "antd/dist/reset.css"; // Import Ant Design styles
import App from "./app.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLandingPage from "./Pages/MainLandingPage.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Catergoies from "./Pages/Catergoies.jsx";
import Cart from "./components/Cart.jsx";
import AboutPage from "./Pages/About.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import HelpPage from "./Pages/HelpPage.jsx";
import AdminProducts from "./Pages/admin/AdminProducts.jsx";
import { ProductEditForm } from "./Pages/admin/ProductEditForm.jsx";
import NewProductForm from "./Pages/admin/NewProductForm.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import SignIn from "./Pages/auth/SignIn.jsx";
import SignUp from "./Pages/auth/SignUp.jsx";
import EmailVerification from "./Pages/auth/EmailVerification.jsx";
import ResendVerificationEmail from "./Pages/auth/ResendVerificationEmail.jsx";
import Orders from "./Pages/Orders.jsx";
import AdminOrderPage from "./Pages/admin/AdminOrderPage.jsx";
// import Cart from './components/Cart.jsx'

const persistor = persistStore(store);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainLandingPage /> },
          { path: "/sign-in", element: <SignIn /> },
          { path: "/sign-up", element: <SignUp /> },
          { path: "/product/:id", element: <ProductDetail /> },
          { path: "/categories/:id", element: <Catergoies /> },
          { path: "/cart", element: <Cart /> },
          { path: "*", element: <NotFound /> },
          { path: "/admin/sign-in", element: <SignIn /> },
          { path: "/admin/sign-up", element: <SignUp /> },
          { path: "/About", element: <AboutPage /> },
          { path: "/Contact", element: <ContactPage /> },
          { path: "/help", element: <HelpPage /> },
          { path: "/admin", element: <AdminProducts /> },
          { path: "/admin/product/:id/edit", element: <ProductEditForm /> },
          { path: "/admin/product/new", element: <NewProductForm /> },
          { path: "/buy/:id", element: <CheckoutPage /> },
          { path: "/payment-success", element: <PaymentSuccess />},
          { path: "/search", element: <SearchPage />},
          { path: "/user/verify/:token", element : <EmailVerification />},
          { path: "/resend-verification-email", element : <ResendVerificationEmail />},
          { path: "/myorders", element : <Orders />},
          { path: "/admin/orders", element : <AdminOrderPage />},
    ],
  },
]);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
