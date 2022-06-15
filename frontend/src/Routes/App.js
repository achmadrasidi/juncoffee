import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes, { IsLoggedInRoutes, PrivateRoutes } from "../Auth/AuthRoutes";
import AddProduct from "../Components/Product/AddProduct";
import AddPromo from "../Components/Product/AddPromo";
import EditProduct from "../Components/Product/EditProduct";
import EditPromo from "../Components/Product/EditPromo";
import EmailConfirm from "../Pages/Auth/EmailConfirm";
import ForgotPass from "../Pages/Auth/ForgotPass";
import Login from "../Pages/Auth/Login";
import Logout from "../Pages/Auth/Logout";
import Payment from "../Pages/Auth/Payment";
import Register from "../Pages/Auth/Register";
import Cart from "../Pages/Cart";
import Dashboard from "../Pages/Dashboard";
import History from "../Pages/History";
import Home from "../Pages/Home";
import Order from "../Pages/Order";
import Product from "../Pages/Product";
import Detail from "../Pages/Product/Detail";
import Profile from "../Pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoutes>
              <Order />
            </PrivateRoutes>
          }
        />

        <Route path="product">
          <Route path="" element={<Product />} />
          <Route path=":id" element={<Detail />} />
          <Route
            path="add-product"
            element={
              <PrivateRoutes>
                <AddProduct />
              </PrivateRoutes>
            }
          />
          <Route
            path="add-promo"
            element={
              <PrivateRoutes>
                <AddPromo />
              </PrivateRoutes>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <PrivateRoutes>
                <EditProduct />
              </PrivateRoutes>
            }
          />

          <Route
            path="edit-promo/:id"
            element={
              <PrivateRoutes>
                <EditPromo />
              </PrivateRoutes>
            }
          />
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

        <Route path="/forgot-password/">
          <Route path="" element={<ForgotPass />} />
          <Route path=":email" element={<ForgotPass />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
