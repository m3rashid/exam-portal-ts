import { Steps, Typography } from 'antd';
import React, { useEffect } from 'react';
import { steps } from 'utils/steps';
// import { changeStep } from "../../../actions/testAction";
// import BasicTestForm from "./basicForm";
// import SelectQuestion from "./selectQuestion";
// import FinalQuestionView from "./questionview";
// import { ChangeSubjectTableData } from "../../../actions/adminAction";
// const { Step } = Steps;
// const { Title } = Typography;

export interface INewTest {}

const NewTest: React.FC<INewTest> = (props) => {
  useEffect(() => {
    this.props.ChangeSubjectTableData();
  }, []);

  return (
    <div>
      <div
        className='w-[100%] text-center'
        style={{ padding: '0px auto 5px auto' }}
      >
        <Typography.Title level={3}>Create new Test</Typography.Title>
      </div>
      <Steps className='w-[80%] ml-[10%]' current={this.props.test.currentStep}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='pt=[30px]'>
        {this.props.test.currentStep === 1 ? (
          <SelectQuestion />
        ) : this.props.test.currentStep === 2 ? (
          <FinalQuestionView />
        ) : (
          <BasicTestForm />
        )}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   test: state.test,
// });

export default NewTest;
// connect(mapStateToProps, {
//   changeStep,
//   ChangeSubjectTableData,
// })(
//   );
