import { isMuiElement } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context'
import { useNavigate } from 'react-router-dom';

/*

TODO:

FIXME:



*/


const InitialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
    showAlert: false,
}

const Register = () => {
    const [values, setValues] = useState(InitialState);
    const {
        user,
        isLoading,
        showAlert,
        displayAlert,
        registerUser,
        loginUser,
        addUserToLocalStorage,
        removeUserFromLocalStorage } = useAppContext();
    const navigate = useNavigate();
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password };
        if (isMember) {
            console.log("Already a member");
            loginUser(currentUser);
        } else {
            registerUser(currentUser);
        }

    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {/* name input */}
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* email input */}
                <FormRow
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password input */}
                <FormRow
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}


export default Register;