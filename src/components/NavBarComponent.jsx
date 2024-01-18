
import React, { useEffect, useState } from 'react';
import "../styles/global.css";
import "..//styles/navBar.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getAllUsers, getUserById } from '../services/userService';
import { useDispatch, useSelector} from 'react-redux';
import { setIdUser } from '../redux/userSlice';



export const NavbarComponent = (props) => {
  const [userName, setUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.user.idUser);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      setAllUsers(data);
      const user = await getUserById(idUser);
      if(user){
        setUserName(user.name);
      }
    };
    fetchData();
  }, [idUser]);
  
  console.log(userName, "User en state");

  const loginUser = (event) => {
     setUserName(event.target.value);
     const user = allUsers.find((user) => user.name === event.target.value);
    dispatch(setIdUser(user.id));
      localStorage.setItem("idUser", user.id);    
  }

  return (
    <div className="container navBar">
       
        <h5 className='text-navBar'>Gestion de ventas</h5>
        <FormControl  sx={{ m: 1, minWidth: 120}} size='small'>
          <InputLabel>Usuario</InputLabel>
          <Select
            
            value={userName}
            label="Usuario"
            onChange={loginUser}
          >
            {allUsers.map((user) => (
              <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
    </div>
  );
}


export default NavbarComponent;