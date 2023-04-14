import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';

import EnhancedTable from '../../components/EnhancedTable'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/posts';
import {Link} from 'react-router-dom'

import { Navigate} from "react-router-dom";
import { selectIsAuth } from '../../redux/slices/auth';

import styles from './Dashboard.module.scss';
import logo from '../../assets/img/admin_logo.png'
import { ThemeProvider, createTheme } from '@mui/material/styles';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 1,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeMenuItem, setActiveMenuItem] = React.useState(0) 
  const dispatch = useDispatch()

  const isAuth = useSelector(selectIsAuth)

  const {data} = useSelector(state => state.auth)
  const {posts} = useSelector(state => state.posts)
  const {comments} = useSelector(state => state.comments)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const postsHeadCells = [
    {
      id: '_id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Title',
    },
    {
      id: 'viewsCount',
      numeric: true,
      disablePadding: false,
      label: 'Views count',
    },
    {
      id: 'imageUrl',
      numeric: false,
      disablePadding: true,
      label: 'Image',
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: true,
      label: 'Created at',
    },
   
  ];

  const commentsHeadCells = [
  
    {
      id: 'text',
      numeric: false,
      disablePadding: true,
      label: 'Text',
    },
    {
      id: 'user',
      numeric: false,
      disablePadding: true,
      label: 'User',
    },
   
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: true,
      label: 'Created at',
    },
   
  ];

  React.useEffect(()=> {
    dispatch(fetchPosts())

  
  }, [])

  if(!window.localStorage.getItem('token') && !isAuth 
  
  ) {
    return <Navigate to='/' />
  }

  return (

    // <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', width: '100%'}}>
        {/* <CssBaseline /> */}
        
        <AppBar position="fixed" color="primary" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Link to='/'  className={styles.logo} ><img src={logo} alt = 'François le Coq'/></Link> 
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Drawer variant="permanent" open={open} >
          <DrawerHeader >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Posts', 'Comments', 'Users'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={activeMenuItem === index}
                  onClick={()=>setActiveMenuItem(index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    {index === 0 ? <ArticleIcon /> :
                    index === 1 ? <ChatIcon /> :
                    index === 2 ? <PeopleIcon /> : null
                    }
                    
                    


                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0, backgroundColor: 'primary'}}  >
          {
            activeMenuItem === 0 ? <EnhancedTable headCells={postsHeadCells} tableName={'Posts'}  data={posts}/> :
            activeMenuItem === 1 ? <EnhancedTable headCells={commentsHeadCells} tableName={'Comments'}  data={comments}/> :
            activeMenuItem === 2 ? null : null
          
          }
            
        </Box>
      </Box>
    // </ThemeProvider>

  );
}