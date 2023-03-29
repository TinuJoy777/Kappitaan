import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Divider from '@mui/material/Divider'

const sections = [
  { title: 'Home', url: '#' },
  { title: 'Work Abroad', url: '#' },
  { title: 'Hire With Bluehost', url: '#' },
  { title: 'Jobs', url: '#' },
  { title: 'Blog', url: '#' },
  { title: 'Contact Us', url: '#' },
]

const content = [
  {
    header: 'OUR APPROACH',
    title: 'Bluehost is commited to your success',
    description:
      'Discover a new way to work abroad. Bluehost was created as a single platform to help you find work abroad. Working closely with recruiters and immigration specialists, we’ll help you start your new career as a healthcare professional in just 6-9 months.',
  },
  {
    header: 'HOW IT WORKS',
    description: 'Launch your new future in a few easy steps',
  },
]

const Bluehost = () => {
  return (
    <>
      <CssBaseline sx={{ overflow: 'auto' }} />
      <Header sections={sections} />
      <Container>
        {content.map((data) => (
          <Content key={data.header} data={data} />
        ))}
      </Container>
      <Divider></Divider>
      <Footer />
    </>
  )
}

export default Bluehost
