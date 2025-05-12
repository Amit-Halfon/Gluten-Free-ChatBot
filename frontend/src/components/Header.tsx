import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <AppBar sx={{ bgcolor: "#7EC18E", position: "static" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {isAuthenticated ? (
            <NavigationLink
              onClick={() => logout()}
              bg="#2E8B57"
              text="Log out"
              textColor="black"
            />
          ) : (
            <>
              <NavigationLink
                onClick={() => loginWithRedirect()}
                bg="#2E8B57"
                text="Log in"
                textColor="black"
              />
              <NavigationLink bg="#2E8B57" textColor="white" text="Sign Up" />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
