import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes, { IsLoggedInRoutes } from "../Auth/AuthRoutes";
import EmailConfirm from "../Pages/Auth/EmailConfirm";
import ForgotPass from "../Pages/Auth/ForgotPass";
import Login from "../Pages/Auth/Login";
import Logout from "../Pages/Auth/Logout";
import Payment from "../Pages/Auth/Payment";
import Register from "../Pages/Auth/Register";
import Cart from "../Pages/Cart";
import History from "../Pages/History";
import Home from "../Pages/Home";
import Product from "../Pages/Product";
import Detail from "../Pages/Product/Detail";
import Profile from "../Pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="product">
          <Route path="" element={<Product />} />
          <Route path=":id" element={<Detail />} />
        </Route>

        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoutes>
              <History />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/auth/register"
          element={
            <IsLoggedInRoutes>
              <Register />
            </IsLoggedInRoutes>
          }
        />

        <Route path="/auth/confirm/:token" element={<EmailConfirm />} />

        <Route path="/auth/payment/:token" element={<Payment />} />

        <Route
          path="/auth/login"
          element={
            <IsLoggedInRoutes>
              <Login />
            </IsLoggedInRoutes>
          }
        />

        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
