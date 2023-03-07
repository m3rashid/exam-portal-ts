import React, { PropsWithChildren } from 'react';

const Usercontainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-[100%] pl-[106px] pt-[50px] min-h-[100vh]'>
      <div className='w-[100%] min-h-[100vh] bg-[rgb(205, 217, 225)] p-[20px]'>
        {children}
      </div>
    </div>
  );
};

export default Usercontainer;
