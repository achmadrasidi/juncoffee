import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        await axios.delete("http://localhost:5000/auth/logout", { headers: { Authorization: `Bearer ${user.token}` } });
        localStorage.removeItem("userInfo");
        return navigate("/auth/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
};

export default Logout;
