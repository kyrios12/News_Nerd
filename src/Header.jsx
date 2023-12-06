import React from 'react';

const Header = ({ user, onLogin, onLogout }) => {
  return (
    <header>
      <h1>News App</h1>
      {user ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLogin}>Login with Google</button>
      )}
    </header>
  );
};

export default Header;