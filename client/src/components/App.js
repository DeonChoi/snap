import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Collection from './Collection';
import Login from './Login';
import Logout from './Logout';

import '../styles/App.css';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect( () => {
    toggleLoggedIn();
  }, []);

  const toggleLoggedIn = () => {
    localStorage.getItem('auth-token') ? setLoggedIn(true) : setLoggedIn(false);
  };

  const toggleNav = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  const closeMenu1 = {
    WebkitTransform: 'rotate(-45deg) translate(-9px, 6px)',
    transform: 'rotate(-45deg) translate(-9px, 6px)'
  };
  const closeMenu2 = {
    opacity: '0'
  };
  const closeMenu3 = {
    WebkitTransform: 'rotate(45deg) translate(-8px, -8px)',
    transform: 'rotate(45deg) translate(-8px, -8px)' 
  };

  return (
    <Router basename={'/'}>
      <div className='App'>

        <header>
          <nav className={isOpen ? 'responsive topNav' : 'topNav'} >
            <Link to={'/'} className='brand'>Snap</Link>
            <Link to={'/'}>Search</Link>
            <Link to={'/collection/get'}>Collection</Link>
            {
              loggedIn 
              ? null
              : <Link to={'/user/register'}>Register</Link>
            }
            {
              loggedIn 
              ? <Link to={'/user/logout'} onClick={toggleLoggedIn}>Logout</Link>
              : <Link to={'/user/login'}>Login</Link>
            }
            

            <a className='menuButton' href='javascript:void(0);' onClick={toggleNav}>
              <div className='bar1' style={ isOpen ? closeMenu1 : null } onClick={toggleNav}></div>
              <div className='bar2' style={ isOpen ? closeMenu2 : null } onClick={toggleNav}></div>
              <div className='bar3' style={ isOpen ? closeMenu3 : null } onClick={toggleNav}></div>
            </a>
          </nav>

        </header>

        <main>
          <Route exact path='/' component={Home} />
          <Route path='/user/register' component={Register} />
          <Route path='/collection/get' component={Collection} />
          {
            loggedIn
            ? <Route path ='/user/logout' component={Logout} />
            : <Route path='/user/login' component={Login} />
          }
        </main>

      </div>
    </Router>
  );
}

export default App;
