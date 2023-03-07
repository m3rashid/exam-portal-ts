import React, { PropsWithChildren } from 'react';

const Usercontainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '106px',
        paddingTop: '50px',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          background: 'rgb(205, 217, 225)',
          padding: '20px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Usercontainer;
