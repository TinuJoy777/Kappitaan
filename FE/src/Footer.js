import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Copyright() {
  return (
    <Typography align="left">
      {
        '© 2020 Blue Host Inc. All rights reserved. By using this website, you accept our '
      }
      <Link color="#4174e7" display="block" underline="none" href="/">
        Terms of use and Privacy policy
      </Link>
    </Typography>
  )
}

function Footer(props) {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
