import * as React from 'react'
import { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import Divider from '@mui/material/Divider'
import Login from './Login'
import SignUp from './SignUp'

export default function Header(props) {
  const { sections } = props

  const [open, setOpen] = useState(false)

  const [openSignUp, setOpenSignUp] = useState(false)
  // console.log(loginPopup)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpenSignUp = () => {
    setOpenSignUp(true)
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  return (
    <AppBar style={{ background: '#FFFFFF' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ marginLeft: 10 }}
          >
            <img
              src="https://kappitaan.com/wp-content/uploads/2022/09/kappitaan-logo.svg"
              alt="react logo"
              style={{ width: '200px', marginTop: 20 }}
            />
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
                paddingLeft: 30,
              },
            }}
          >
            {sections.map((section) => (
              <Button
                key={section.title}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                }}
              >
                {section.title}
              </Button>
            ))}
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              p: 1,
              m: 1,
            }}
          >
            {/* <List>
            <ListItemButton
              sx={{
                color: 'black',
                outlineStyle: 'none',
              }} */}
            {/* > */}
            {/* <ListItemIcon>
                <LockOpenTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton sx={{ color: 'black' }}>
              <ListItemIcon>
                <AddCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton> */}
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: 'none', color: 'black' }}
              onClick={() => setOpen(true)}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <LockOpenTwoToneIcon fontSize="small" />
                <span>Log In</span>
              </Stack>
            </Button>
            {open && <Login open={open} handleClose={handleClose} />}
            <Button
              sx={{ textTransform: 'none', color: 'black' }}
              onClick={() => setOpenSignUp(true)}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <AddCircleIcon fontSize="small" />
                <span>Register</span>
              </Stack>
            </Button>
            {openSignUp && (
              <SignUp
                openSignUp={openSignUp}
                handleCloseSignUp={handleCloseSignUp}
              />
            )}
          </Box>
          {/* </List> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
