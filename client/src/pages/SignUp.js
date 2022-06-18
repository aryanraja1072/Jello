import React from 'react'
import { useState, useEffect} from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name:'',
  email:'',
  password:'',
  isMember: true
}

const SignUp = () => {
  const [values, setValues] = useState(initialState);

  

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {

  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <h3>{values.isMember?'Sign In':'Sign Up'}</h3>

      </form>
    </Wrapper>
  )
}

export default SignUp