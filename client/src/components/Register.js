import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';


const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeFirstName = e => {
        setFirstName(e.target.value);
    };

    const onChangeLastName = e => {
        setLastName(e.target.value);
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const userRegister = {
            firstName,
            lastName,
            email,
            password
        };
        await axios.post('http://localhost:3000/user/register', userRegister)
                .then( res => {console.log(res); props.history.push('./login')})
                .catch( err => console.error(err));
    };

    return (
        <div>
            <form className='registerForm' onSubmit={onSubmit} action = '/user/register' method = 'POST'>
                <div className=''>
                    <input type='text' className='registerInput' placeholder='First Name' onChange={onChangeFirstName} required/>
                </div>
                <div className=''>
                    <input type='text' className='registerInput' placeholder='Last Name' onChange={onChangeLastName} required/>
                </div>
                <div className=''>
                    <input type='email' className='registerInput' placeholder='Email Address' onChange={onChangeEmail} required/>
                </div>
                <div className=''>
                    <input type='password' className='registerInput' placeholder='Password' onChange={onChangePassword} required/>
                </div>
                <div className=''>
                    <button type="submit" className='registerSubmit'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;