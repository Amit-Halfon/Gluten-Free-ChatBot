import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { signupUser } from "../helpers/api-communicator";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getAccessTokenSilently().then((token) => {
        signupUser(token)
          .then(() => {
            toast.success("Successfully signed up");
            navigate("/chat");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Unable to signup");
            navigate("/");
          });
      });
    } else if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Signup;
