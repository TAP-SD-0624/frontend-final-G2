import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SearchBox } from '../SearchBox/SearchBox';
import { ReactComponent as CoralLogo } from "../../assets/icons/coral-logo.svg";
import { useNavigate } from "react-router-dom";

import { ReactComponent as UserIcon } from "../../assets/icons/user-icon.svg";
import { ReactComponent as FillUserIcon } from "../../assets/icons/profile-fill.svg";
import { ReactComponent as EmptyCartIcon } from "../../assets/icons/empty-cart.svg";
import {useLandingProducts, useLogout, useUser} from "../../hooks/useAppAPIs";
import { useState } from "react";
import Link from "@mui/material/Link";


const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: categories } = useLandingProducts('categories');


  const navigate = useNavigate();

  const { userData, refetchUser } = useUser()
  const userMutation = useLogout();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await userMutation.mutateAsync();

      localStorage.removeItem('token');

      setTimeout(async () => {
        await refetchUser();
        navigate('/');
      }, 1000);
    } catch (error) {
      throw error;
    }
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none' }} >
      <Toolbar>
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <CoralLogo />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton

            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="cc"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {categories && categories.slice(0, 5).map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu} >
                <Typography variant={'h4'} component={'h2'} sx={{ color: 'TypeHighEmphasis' }} textAlign="center" onClick={() => navigate(`/products?categoryId=${page.id}`)}>{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            onClick={() => navigate('/')}
          >
            <Typography
              variant="h3"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 10,
                fontFamily: 'monospace',
                fontWeight: 400,
                color: '#17494D',
                textDecoration: 'none',
              }}
            >
              Home
            </Typography>
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {categories && categories.slice(0, 5).map((page) => (
            <Button
              key={page.id}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: 'block', color: "TypeHighEmphasis.main" }}
            >
              <Typography variant={'h4'} component={'span'} onClick={() => navigate(`/products?categoryId=${page.id}`)}>{page.name}</Typography>
            </Button>
          ))}
        </Box>
        <Box sx={{ backgroundColor: 'accent.main', flexGrow: 1, display: { xs: 'flex', md: 'flex' }, width: '362px', height: '44px', mr: '15px' }}>
          <SearchBox />
        </Box>
        <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex'}}>
            <IconButton onClick={() => navigate('/my-wishlist')} sx={{ p: 0, mr: '5px', color: 'primary.main' }}>
              <FavoriteBorderIcon />
            </IconButton>

            {userData ? (
                <>
                  <div style={{display: 'flex', flexDirection: "column", justifyContent: 'center'}}>
                    <IconButton onClick={handleClick} sx={{ display: 'flex',p: 0, mr: '5px', color: 'primary.main', alignSelf: 'center' }}>
                      <FillUserIcon />
                    </IconButton>
                  </div>
                  <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                  >
                    <MenuItem onClick={() => { navigate('/user-profile/info'); handleClose(); }}>View Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
            ) : (
                <IconButton onClick={() => navigate('/sign-in')} sx={{ p: 0, mr: '5px', color: 'primary.main' }}>
                  <UserIcon />
                </IconButton>
            )}

            <Link href={'/my-cart'} sx={{ marginTop: '8px', display: 'block' }}>
              <EmptyCartIcon />
            </Link>
          </div>

        </Box>

      </Toolbar>
      {userData && <Typography sx={{ color: 'primaryTint.main', display:'flex', justifyContent: 'flex-end', marginRight: '1rem', marginTop:'-1rem' }}>Hello {userData.firstName}</Typography>}
    </AppBar>
  );
}

export default Header