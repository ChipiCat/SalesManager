import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem as MuiMenuItem, Select, useTheme, useMediaQuery } from '@mui/material';
import { getAllUsers, getUserById } from '../services/userService';
import { useDispatch, useSelector} from 'react-redux';
import { setIdUser } from '../redux/userSlice';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';
import "../styles/global.css";

export const NavbarComponent = (props) => {
  const [userName, setUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.user.idUser);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      setAllUsers(data);
      const user = await getUserById(idUser);
      if (user) {
        setUserName(user.name);
      }
    };
    fetchData();
  }, [idUser]);

  const loginUser = (event) => {
    setUserName(event.target.value);
    const user = allUsers.find((user) => user.name === event.target.value);
    dispatch(setIdUser(user.id));
    localStorage.setItem("idUser", user.id);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'var(--primary-color)' }}>
      <Toolbar>
      <SwipeableTemporaryDrawer />
        <Typography variant={isSmallScreen ? "h7" : "h6"} component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Gestion de ventas
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel>Usuario</InputLabel>
          <Select
            value={userName}
            label="Usuario"
            onChange={loginUser}
          >
            {allUsers.map((user) => (
              <MuiMenuItem key={user.id} value={user.name}>{user.name}</MuiMenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;