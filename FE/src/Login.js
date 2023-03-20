import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal'
import { createTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { Backdrop } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const paperStyle = {
  padding: 20,
  height: '90vh',
  width: 600,
  margin: '20px auto',
}
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '10px 0', backgroundColor: '#14294c' }
const theme = createTheme({
  spacing: 12,
})
const iconStyle = {
  backgroundColor: 'black',
  margin: '0 0 0 400px',
}

export default function Login({ open, handleClose }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameErr, setNameErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})
  const [formValid, setFormValid] = useState(true)
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = formValidation()

    if (isValid) {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          setName('')
          setPassword('')
          data.success ? setMessage(data.success) : setMessage(data.error)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  const formValidation = () => {
    const nameErr = {}
    const passwordErr = {}
    let isValid = true

    if (name == '') {
      nameErr.nameEmpty = 'Name Is Required'
      isValid = false
    } else if (name.trim().length < 5) {
      nameErr.nameShort = 'Name should be more than 5 letters'
      isValid = false
    } else if (name.trim().length > 30) {
      nameErr.nameLong = 'Name should be less than 15 letters'
      isValid = false
    } else if (password == '') {
      passwordErr.passwordEmpty = 'Password Is Required'
      isValid = false
    }

    setNameErr(nameErr)
    setPasswordErr(passwordErr)

    if (isValid == false) {
      setFormValid(false)
    }
    return isValid
  }
  return (
    // <Backdrop
    //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={bckdrpOpen}
    //   onClick={handleBckdrop}
    // >
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ overflow: 'scroll' }}
      // onClick={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid>
        <form onSubmit={handleSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              {/* <Avatar style={avatarStyle}></Avatar> */}
              <Box display="flex" flexDirection="row">
                <Typography
                  align="left"
                  variant="h2"
                  fontFamily="sans-serif"
                  color="#333"
                  sx={{ margin: '10px', fontSize: '1.75rem' }}
                >
                  Log In
                </Typography>
                <button style={iconStyle} onClick={handleClose}>
                  <CloseIcon sx={{ color: 'white' }}></CloseIcon>
                </button>
              </Box>
              <Divider sx={{ marginTop: '10px' }}></Divider>
            </Grid>
            <TextField
              placeholder="Enter username"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              theme={theme}
              helperText={Object.keys(nameErr).map((key) => [nameErr[key]])}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              placeholder="Enter password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              helperText={Object.keys(passwordErr).map((key) => [
                passwordErr[key],
              ])}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              sx={{ display: 'block' }}
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
            >
              Login
            </Button>
            <p style={{ color: 'green' }}>{message}</p>
            <Typography>
              {' '}
              <span>Don't have an account?</span>
              <Link href="#" sx={{ textDecoration: 'none', color: '#14294c' }}>
                Sign up now
              </Link>
            </Typography>
            <Typography>
              <Link href="#" sx={{ textDecoration: 'none', color: '#14294c' }}>
                Lost password ?
              </Link>
            </Typography>
          </Paper>
        </form>
      </Grid>
    </Modal>
    // </Backdrop>
  )
}
