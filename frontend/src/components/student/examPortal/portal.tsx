import { Skeleton, Typography } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Instruction from './instruction';
// import { connect } from "react-redux";
// import { Typography, Skeleton } from "antd";
// import "./portal.css";
// import Instruction from "./instruction";
// import TestBoard from "./testBoard";
// import Answer from "../answersheet/answer";
// import {
//   fetchTraineedata,
//   setTestDetsils,
//   fetchTestdata,
// } from "../../../actions/traineeAction";
// const { Title } = Typography.;

export interface IMainPortal {}

const MainPortal: React.FC<IMainPortal> = (props) => {
  let params = queryString.parse(props.location.search);
  const [state, setState] = useState({
    testDetails: params,
  });

  props.setTestDetails(params.testid, params.traineeid);

  useEffect(() => {
    props.fetchTraineedata(state.testDetails.traineeid);
    props.fetchTestdata(state.testDetails.testid, state.testDetails.traineeid);
  }, []);

  if (props.trainee.initialloading2 || props.trainee.initialloading1) {
    return (
      <div className='w-[100%] h-[100%] absolute p-[100px]'>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  if (props.trainee.invalidUrl) {
    return (window.location.href = '');
  }

  if (props.trainee.LocaltestDone) {
    return (
      <div>
        <Answer />
      </div>
    );
  }

  if (props.trainee.testconducted) {
    return (
      <div className='w-[100%] h-[100%] absolute bg-[rgb(205, 217, 225)]'>
        <div
          className='w-[50%] min-h-[200px] ml-[25%] absolute top-[50%] bottom-[50%] rounded-[5px] p-[50px]'
          style={{
            background:
              'linear-gradient(to right, rgb(183, 233, 247), rgb(219, 243, 250), rgb(245, 252, 255))',
            verticalAlign: 'middle',
          }}
        >
          <Typography.Title
            className='text-white text-center'
            style={{ color: '#fff' }}
            level={4}
          >
            The Test is Over!
            <br /> You are late.
          </Typography.Title>
        </div>
      </div>
    );
  }

  if (!props.trainee.testbegins) {
    return (
      <div className='w-[100%] h-[100%] absolute bg-[rgb(205, 217, 225)]'>
        <div
          className='w-[50%] min-h-[200px] ml-[25%] absolute top-[50%] bottom-[50%] rounded-[5px] p-[50px]'
          style={{
            background:
              'linear-gradient(to right, rgb(183, 233, 247), rgb(219, 243, 250), rgb(245, 252, 255))',
            verticalAlign: 'middle',
          }}
        >
          <Typography.Title
            className='text-white text-center'
            style={{ color: '#000000' }}
            level={4}
          >
            The test has not started yet. Wait for the tutor's instruction then
            refresh the page.
          </Typography.Title>
        </div>
      </div>
    );
  }

  if (props.trainee.startedWriting) {
    return (
      <div>
        <TestBoard />
      </div>
    );
  }

  return (
    <div>
      <Instruction />
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

/**
 * connect(mapStateToProps, {
  fetchTraineedata,
  setTestDetails,
  fetchTestdata,
 */

export default MainPortal;
