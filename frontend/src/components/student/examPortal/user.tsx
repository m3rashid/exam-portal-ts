import React from 'react';
// import { connect } from 'react-redux';
// import './portal.css';
// import user_icon from './user.png';

export interface ITrainee {}

const Trainee: React.FC<ITrainee> = (props) => {
  return (
    <div className='w-[100%]'>
      <div>
        <img
          alt='User Icon'
          src='/user.png'
          className='w-[30%] mt-[20px] mr-[35%] mb-[10px] ml-[35%]'
        />
        <div className='w-[100%] py-0 px-[12px] text-white text-center'>
          <p>{props.trainee.traineeDetails.name}</p>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

export default Trainee;
// connect(mapStateToProps, null)(
// );
