import React from 'react';
import { Button } from 'antd';
// import {
//   changeStep,
//   changeBasicNewTestDetails,
// } from '../../../actions/testAction';
// import GeneraterandomQuestion from './generaterandomquestion';
// import './newtest.css';

export interface ISelectQuestion {}

const SelectQuestion: React.FC<ISelectQuestion> = (props) => {
  // const questionCount = (
  //   <Button>
  //     Question Selected : {props.test.newtestFormData.testQuestions.length}
  //   </Button>
  // );

  return (
    <div>
      {/* <Tabs defaultActiveKey="2" tabBarExtraContent={questionCount}> */}
      {/* <TabPane tab="Questions-Random" key="1">
          <GeneraterandomQuestion mode="random" />
        </TabPane> */}
      {/* <TabPane tab="Questions" key="2"> */}
      <GenerateRandomQuestion mode='manual' />
      {/* </TabPane> */}
      {/* </Tabs> */}
      <div style={{ width: '100%', padding: '10px' }}>
        <Button
          style={{ float: 'right' }}
          type='primary'
          onClick={() => props.changeStep(2)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   test: state.test,
// });

export default SelectQuestion;
// connect(mapStateToProps, {
//   changeStep,
//   changeBasicNewTestDetails,
// })(
//   );
