import { useNavigate } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();
  return <Component {...props} navigate={navigate} />;
};

export default withNavigate;
