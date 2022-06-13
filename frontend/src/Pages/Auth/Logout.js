import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/SubComponent/Loading";

const Logout = () => {
  const { loading } = useSelector((state) => state.userLogout);

  if (loading) {
    return <Loading show={true} backdrop="static" keyboard={true} />;
  }

  return <Navigate to="/auth/login" replace />;
};

export default Logout;
