import React, { PropsWithChildren, useEffect, useState } from 'react';

import InventoryIcon from '@mui/icons-material/Inventory';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StarIcon from '@mui/icons-material/Star';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { ICompanyInformation, IUser, ROLES } from '~/types';
import { Get, auth, collections, useErrorNotif, useLogin } from '~/utils';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer({
  hasContainer,
  children,
}: PropsWithChildren<{
  hasContainer?: boolean;
}>) {
  const [companyInfo, setCompanyInfo] = useState<
    ICompanyInformation | undefined
  >();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();

  const { user } = useLogin();

  useEffect(() => {
    const getCompanyInfo = async () => {
      const data = await Get<ICompanyInformation>({
        docRef: collections.companyInfo.ref,
      });
      setCompanyInfo(data);
    };

    if (!companyInfo) getCompanyInfo();
  }, [companyInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await Get<IUser>({
        docRef: `${collections.users.string}/${user?.uid}`,
      });
      setUserInfo(data);
    };

    if (!userInfo && user) getUserInfo();
  }, [userInfo, user]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { checkState } = useLogin('/');
  const showError = useErrorNotif();

  const handleLogout = async () => {
    try {
      signOut(auth);
      checkState();
    } catch (err) {
      showError(err);
    }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/employee-list')}>
          <Box display='flex' alignItems='center'>
            <ListItemIcon>
              <img
                draggable={false}
                src={companyInfo?.logo}
                style={{ maxHeight: '2rem' }}
                alt='company-logo'
              />
            </ListItemIcon>
            <Typography>
              <strong>{companyInfo?.companyName}</strong>
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          { label: 'Employee List', Icon: PeopleIcon, link: '/employee-list' },
          {
            label: 'Step Increment',
            Icon: SwitchAccessShortcutIcon,
            link: '/step-increment',
          },
          { label: 'Promotions', Icon: StarIcon, link: '/promotions' },
          { label: 'Loyalty Pay', Icon: LoyaltyIcon, link: '/loyalty-pay' },
          // { label: "Wishlist", Icon: StarIcon, link: "/wishlist" },
          // { label: "Contact", Icon: PhoneIcon, link: "/contact" },
        ].map(({ label, Icon, link }) => (
          <ListItem onClick={() => navigate(link)} button key={label}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <Divider />
        {userInfo &&
          userInfo.roles.includes(ROLES.ADMIN) &&
          [
            { label: 'Orders', Icon: ReceiptLongIcon, link: '/orders' },
            { label: 'Inventory', Icon: InventoryIcon, link: '/inventory' },
            // { label: "Contact", Icon: PhoneIcon, link: "/contact" },
          ].map(({ label, Icon, link }) => (
            <ListItem onClick={() => navigate(link)} button key={label}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const navigate = useNavigate();
  return (
    <>
      {companyInfo && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky' sx={{ mb: 2 }}>
              <Toolbar>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer('left', true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1 }}
                ></Typography>
                <Button color='inherit' onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
            {hasContainer ? (
              <Container maxWidth='xl'>{children}</Container>
            ) : (
              children
            )}
          </Box>

          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </div>
      )}
    </>
  );
}
