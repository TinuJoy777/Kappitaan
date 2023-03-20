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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import TabList from '@mui/lab/TabList'
import './SignUp.css'

const paperStyle = {
  padding: 20,
  height: '120vh',
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

export default function SignUp({ openSignUp, handleCloseSignUp }) {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [value, setValue] = useState(0)
  const [firstNameErr, setFNameErr] = useState({})
  const [lastNameErr, setLNameErr] = useState({})
  const [emailErr, setEmailErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})
  const [formValid, setFormValid] = useState(true)
  const [agreement, setAgreement] = useState(false)
  const [agreementErr, setAgreementErr] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (e, val) => {
    setValue(val)
  }

  const handlePrivacyChange = (event) => {
    setAgreement(event.target.checked)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = formValidation()

    if (isValid) {
      fetch('http://localhost:5000/signup', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          value: value,
          fname: fname,
          lname: lname,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          setFname('')
          setLname('')
          setEmail('')
          setPassword('')
          data.success ? setMessage(data.success) : setMessage(data.error)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  const formValidation = () => {
    const firstNameErr = {}
    const lastNameErr = {}
    const emailErr = {}
    const passwordErr = {}
    const agreementErr = {}
    let isValid = true

    if (fname == '') {
      firstNameErr.nameEmpty = 'First Name Is Required'
      isValid = false
    } else if (lname == '') {
      lastNameErr.nameEmpty = 'Last Name Is Required'
      isValid = false
    } else if (email == '') {
      emailErr.emailEmpty = 'Email Is Required'
      isValid = false
    } else if (password == '') {
      passwordErr.passwordEmpty = 'Password Is Required'
      isValid = false
    } else if (agreement == false) {
      agreementErr.agreementErrEmpty = 'Please Accept The Policy'
      isValid = false
    }

    setFNameErr(firstNameErr)
    setLNameErr(lastNameErr)
    setEmailErr(emailErr)
    setPasswordErr(passwordErr)
    setAgreementErr(agreementErr)

    if (isValid == false) {
      setFormValid(false)
    }
    return isValid
  }
  return (
    // <Backdrop
    //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={open}
    //   onClick={handleClose}
    // >
    <Modal
      open={openSignUp}
      onClose={handleCloseSignUp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: 'scroll' }}
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
                  Sign Up
                </Typography>
                <button style={iconStyle} onClick={handleCloseSignUp}>
                  <CloseIcon sx={{ color: 'white' }}></CloseIcon>
                </button>
              </Box>
              <Divider sx={{ marginTop: '10px' }}></Divider>
            </Grid>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
            <Tabs
              value={value}
              onChange={handleChange}
              // onChange={(e) => setUserType(e.target.value)}
              variant="fullWidth"
              aria-label="icon position tabs example"
              // selectionFollowsFocus
              // sx={{ mb: 2, borderRadius: 'lg' }}
              sx={{
                '& button:focus': { backgroundColor: '#14294c' },
              }}
            >
              <Tab
                icon={<PersonOutlineIcon />}
                iconPosition="start"
                label="Candidate"
              />
              <Tab
                icon={<BusinessCenterIcon />}
                iconPosition="start"
                label="Employer"
              />
            </Tabs>
            {/* </Box> */}
            <TextField
              placeholder="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              theme={theme}
              helperText={Object.keys(firstNameErr).map((key) => [
                firstNameErr[key],
              ])}
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
            <TextField
              placeholder="Last Name"
              type="text"
              margin="dense"
              variant="outlined"
              fullWidth
              helperText={Object.keys(lastNameErr).map((key) => [
                lastNameErr[key],
              ])}
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
            <TextField
              placeholder="Email"
              type="text"
              margin="dense"
              variant="outlined"
              fullWidth
              helperText={Object.keys(emailErr).map((key) => [emailErr[key]])}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  onChange={handlePrivacyChange}
                />
              }
              label="I agree to privacy policy"
            />
            <p style={{ color: 'red' }}>
              {Object.keys(agreementErr).map((key) => [agreementErr[key]])}
            </p>
            <Button
              sx={{ display: 'block' }}
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
            >
              Register Your Account
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
