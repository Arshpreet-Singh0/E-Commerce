import { render } from 'preact'
import App from './app.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLandingPage from './Pages/MainLandingPage.jsx'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'
import NotFound from './Pages/NotFound.jsx'

const routes = createBrowserRouter([
     {
          path: '/', element: <App />, children: [
               { path: '/', element: <MainLandingPage /> },
               { path: '/sign-in', element: <SignIn /> },
               { path: '/sign-up', element: <SignUp /> },
               { path: '*', element: <NotFound /> }
          ]
     }
])

render(<RouterProvider router={routes} />, document.getElementById('app'))
