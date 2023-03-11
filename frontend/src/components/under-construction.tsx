import React from 'react';
import Lottie from 'react-lottie';
import underConstructionAnimation from '../animations/under-construction.json';

const UnderConstruction = () => {
  return (
    <div>
      <Lottie
        options={{
          animationData: underConstructionAnimation,
          autoplay: true,
          loop: true,
        }}
      />
      {/* <img src='/under-construction.gif' alt='Under Construction' /> */}
    </div>
  );
};

export default UnderConstruction;
