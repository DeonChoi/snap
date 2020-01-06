import React, { useEffect } from 'react';

const Logout = (props) => {

    useEffect( () => {
        logoutUser();
    }, []);

    const logoutUser = () => {
        localStorage.clear('auth-token');
        console.log('Logged Out');
    }
    
    return (
        <>
            { props.history.push('..') }
            { window.location.reload() }
        </>
    );
};

export default Logout;
