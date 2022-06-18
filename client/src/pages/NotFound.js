import React from 'react'
import logo404 from '../assets/images/404.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const NotFound = () => {
  
  return (
    <Wrapper>
    <div>
      <img src={logo404} alt="404"  />
      <p>Looks like you're in the wrong place</p>
    </div>
    </Wrapper>
  )
}

export default NotFound