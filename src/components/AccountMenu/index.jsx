import React from 'react';
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth';

import { useNavigate} from "react-router-dom";

import interfaceData from "../../assets/data/interface.json"

export const AccountMenu = () => {
  const dispatch = useDispatch()

  const {data} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const newPost = () => {
    navigate('/add-post')
  }

  const goToAdmin = () => {
    navigate('/admin')
  }

  const onClickLogout = () => {
    if(window.confirm(interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.logoutQuestion)){
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };
  return (
  <>
     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
       <Tooltip title={interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.tooltip}>
         <IconButton
           onClick={handleClick}
           size="small"
           sx={{ ml: 2 }}
           aria-controls={open ? 'account-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
         >
           <Avatar sx={{ width: 32, height: 32 }} src={data.avatarUrl}></Avatar>
         </IconButton>
       </Tooltip>
     </Box>
     <Menu
       anchorEl={anchorEl}
       id="account-menu"
       open={open}
       onClose={handleClose}
       onClick={handleClose}
       PaperProps={{
         elevation: 0,
         sx: {
           overflow: 'visible',
           filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
           mt: 1.5,
           '& .MuiAvatar-root': {
             width: 32,
             height: 32,
             ml: -0.5,
             mr: 1,
           },
           '&:before': {
             content: '""',
             display: 'block',
             position: 'absolute',
             top: 0,
             right: 14,
             width: 10,
             height: 10,
             bgcolor: 'background.paper',
             transform: 'translateY(-50%) rotate(45deg)',
             zIndex: 0,
           },
         },
       }}
       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
       anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
     >
       <MenuItem onClick={goToAdmin}>
         <Avatar /> {interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.dashboard}
       </MenuItem>
       <MenuItem onClick={handleClose}>
         <Avatar /> {interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.myProfile}
       </MenuItem>
       <Divider />
       <MenuItem onClick={newPost}>
         <ListItemIcon>
           <PersonAdd fontSize="small" />
         </ListItemIcon>
         {interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.addPost}
       </MenuItem>
       <MenuItem onClick={handleClose}>
         <ListItemIcon>
           <Settings fontSize="small" />
         </ListItemIcon>
         {interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.settings}
       </MenuItem>
       <MenuItem onClick={onClickLogout}>
         <ListItemIcon>
           <Logout fontSize="small" />
         </ListItemIcon>
         {interfaceData.find((el) => el.lang === 'fr')?.inscription.menu.logout}
       </MenuItem>
     </Menu>

  </>
  )
}