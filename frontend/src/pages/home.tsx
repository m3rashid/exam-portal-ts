import Login from 'components/login';
import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from 'services/auth';

interface IProps {}

const Home: React.FC<IProps> = () => {
  // const user = {};

  if (auth.retriveToken() && auth.retriveToken() !== 'undefined') {
    return <Navigate to='/user/home' />;
  } else {
    return (
      <div>
        <div className='parallax'>
          <Login />
        </div>
      </div>
    );
  }
};

export default Home;
