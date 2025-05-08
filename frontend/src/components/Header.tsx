import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import Logo from "./shared/Logo";
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth=useAuth();
  return (
    <AppBar sx= {{bgcolor:"#7EC18E", position: "static",}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo />
            <div>
                {auth?.isLoggedIn ? (
                <>
                <NavigationLink 
                    bg="#2E8B57" 
                    to="/chat" 
                    text="Go To Chat" 
                    textColor="black"/>
                <NavigationLink 
                    bg="#2E8B57" 
                    textColor="white" 
                    to="/" 
                    text="Log Out" 
                    onClick={auth.logout}/>
                </>
                ) : (
                    <>
                <NavigationLink 
                    bg="#2E8B57" 
                    to="/login" 
                    text="Log in" 
                    textColor="black"/>
                <NavigationLink 
                    bg="#2E8B57" 
                    textColor="white" 
                    to="/signup" 
                    text="Sign Up" 
                   />
                </>
                )}
            </div>
        </Toolbar>
    </AppBar>
  );
};

export default Header;