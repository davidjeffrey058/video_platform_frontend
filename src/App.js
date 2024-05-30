import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/login';
import Signup from './pages/signup';
// import ToHome from './methods/toHome';
import Verify from './pages/verify';
import Resetpass from './pages/resetpass';
import ChangePass from './pages/changePass';
import Redirect from './methods/redirect';

function App() {
  const { user } = useAuthContext();

  // const toHome = () => Navigate('/home')

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Redirect /> : <Redirect to={'/login'} />,
      errorElement: <div>404 page not found</div>
    },
    {
      path: '/home',
      element: user ? <Home /> : <Redirect to={'/login'} />,
    },
    {
      path: '/login',
      element: user ? <Redirect /> : <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/verify/:id/:token',
      element: <Verify />
    },
    {
      path: '/resetpass',
      element: <Resetpass />
    },
    {
      path: '/changepass/:uid/:token',
      element: <ChangePass />
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>

  )
}

export default App;
