import { render } from 'preact'
import 'antd/dist/reset.css'; // Import Ant Design styles
import App from './app.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLandingPage from './Pages/MainLandingPage.jsx'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'
import NotFound from './Pages/NotFound.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ProductDetail from './Pages/ProductDetail.jsx'
import Catergoies from './Pages/Catergoies.jsx';
import Cart from './components/Cart.jsx'
import AboutPage from './Pages/About.jsx';
import ContactPage from './Pages/ContactPage.jsx';
import HelpPage from './Pages/HelpPage.jsx';
import AdminProducts from './Pages/admin/AdminProducts.jsx';
// import Cart from './components/Cart.jsx'

const routes = createBrowserRouter([
     {
          path: '/', element: <App />, children: [
               { path: '/', element: <MainLandingPage /> },
               { path: '/sign-in', element: <SignIn /> },
               { path: '/sign-up', element: <SignUp /> },
               {path:'/product/:id',element:<ProductDetail/>},
               {path:'/categories/:id',element:<Catergoies/>},
               {path:'/cart', element : <Cart />},
               { path: '*', element: <NotFound /> },
               {path : '/admin/sign-in', element : <SignIn />},
               {path : '/admin/sign-up', element : <SignUp />},
               {path:'/About',element:<AboutPage/>},
               {path:'/Contact',element:<ContactPage/>},
               {path:'/help',element:<HelpPage/>},
               {path:'/admin',element:<AdminProducts/>}
          ],
     },
])

render(
     <Provider store={store}>
          <RouterProvider router={routes} />
     </Provider>
     , document.getElementById('app'))
