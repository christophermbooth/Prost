import React from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const LandingPage = ({setViewValue}) => {
  return (
    <div>
      <Login setViewValue={setViewValue} />
      <Logout />
    </div>
  );
};

export default LandingPage;