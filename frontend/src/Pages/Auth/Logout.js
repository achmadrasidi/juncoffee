import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/SubComponent/Loading";
import { userLogout } from "../../Redux/Actions/UserAction";

const Logout = () => {
  const { loading, errorLogout, logoutMessage } = useSelector((state) => state.userLogout);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogout());

    setTimeout(() => {
      navigate("/auth/login", { replace: true });
    }, 1500);
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading show={true} backdrop="static" keyboard={true} />
      ) : (
        <Modal show={true} backdrop="static" keyboard={true}>
          <Modal.Header>
            <Modal.Title>{errorLogout ? errorLogout : logoutMessage}</Modal.Title>
          </Modal.Header>
        </Modal>
      )}
    </>
  );
};

export default Logout;
