import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/SubComponent/Loading";
import { userLogout } from "../../Redux/Actions/UserAction";

const Logout = () => {
  const { loading } = useSelector((state) => state.userLogout);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLogout());
  }, [dispatch]);
  if (loading) {
    return <Loading show={true} backdrop="static" keyboard={true} />;
  }
  setTimeout(() => {
    navigate("/auth/login", { replace: true });
  }, 100);
};

export default Logout;
