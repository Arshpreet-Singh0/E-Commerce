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

const routes = createBrowserRouter([
     {
          path: '/', element: <App />, children: [
               { path: '/', element: <MainLandingPage /> },
               { path: '/sign-in', element: <SignIn /> },
               { path: '/sign-up', element: <SignUp /> },
               {path:'/product/:id',element:<ProductDetail/>},
               { path: '*', element: <NotFound /> }
          ]
     }
])

render(
     <Provider store={store}>
          <RouterProvider router={routes} />
     </Provider>
     , document.getElementById('app'))
