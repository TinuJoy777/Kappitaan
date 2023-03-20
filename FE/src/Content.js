import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Content(props) {
  const { data } = props
  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {data.header}
      </Typography>
      <Typography
        variant="h2"
        justifyContent="center"
        fontFamily="Frank Ruhl Libre"
        fontSize="40px"
        fontWeight="500"
        lineHeight="40px"
        color="#14294C"
        align="center"
        gutterBottom
      >
        {data.title}
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        {data.description}
      </Typography>
    </Container>
  )
}
