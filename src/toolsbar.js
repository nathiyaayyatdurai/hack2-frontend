import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {useNavigate,Outlet} from 'react-router-dom';
import { MyContext } from "./context";
import React, { useContext } from "react";


export const  Toolsbar=()=> {
  const { setUser,user,button, setbutton,button1, setbutton1 } = useContext(MyContext)
    const navigate = useNavigate();

    
    return (
      <div className='outlet'>
        <div className='tool'>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("home")}>home</Button>
            <Button color="inherit" onClick={() => navigate("bookedYourSeats")}>booked</Button>
            <Button color="inherit" disabled={button} onClick={() =>{ 
              
              navigate("login")
              }}>{user?"":"login"}</Button>
            <Button color="inherit"  disabled={button1} onClick={() =>{
                   setUser(null)
                   setbutton(false)
                   navigate("home")
            }
              
             }>{user?"logout":""}</Button>
           
           
          </Toolbar>
        </AppBar>
        </div>
        <div >
            <Outlet/>
        </div>
      </div>
  
    );
  }
  export const  Admin=()=> {
    const navigate = useNavigate();
    
    return (
      <div className='outlet'>
        <div className='tool'>
        <AppBar position="static">
          <Toolbar>
          <Button color="inherit" onClick={() => navigate("home")}>home</Button>
          <Button color="inherit" onClick={() => navigate("addmovie")}>AddMovie</Button>
           
          </Toolbar>
        </AppBar>
        </div>
        <div >
            <Outlet/>
        </div>
      </div>
  
    );
  }