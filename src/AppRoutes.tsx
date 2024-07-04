import { Suspense } from 'react';
import ProductView from './pages/ProductView'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Register from './pages/Register'
import PrivateRoute from './pages/PrivateRoute'
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from './AuthContext';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Landing from "./pages/Landing";

export const AppRoutes: React.FC<{}> = () => {
  return (
    <>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <AuthProvider>
            <NavBar/>
            <Routes>
              <Route index path="/" element={
                <Landing />
              }/>

              <Route element={<PrivateRoute redirect='/login' />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="/products/:productId" element={
                <ProductView />
              }/>

            </Routes>
          </AuthProvider>
        </BrowserRouter >
      </Suspense>
    </>
  );
}

export default AppRoutes;
