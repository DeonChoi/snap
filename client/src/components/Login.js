import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const userLogin = {
            email,
            password
        };
        await axios.post('http://localhost:3000/user/login', userLogin)
        .then( res => {console.log(res); console.log('Logged In'); localStorage.setItem('auth-token', res.data); props.history.push('..'); window.location.reload();})
        .catch( err => console.error(err));
    };

    return (
        <div>
            <form className='loginForm' onSubmit={onSubmit} >
                <div className=''>
                    <input type='email' className='loginInput' placeholder='Email Address' onChange={onChangeEmail} />
                </div>
                <div className=''>
                    <input type='password' className='loginInput' placeholder='Password' onChange={onChangePassword} />
                </div>
                <div className=''>
                    <button type="submit" className='loginSubmit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;