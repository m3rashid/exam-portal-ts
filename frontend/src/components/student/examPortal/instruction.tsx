import React from 'react';
import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
// import './portal.css';

export interface IInstruction {}

const Instruction: React.FC<IInstruction> = (props) => {
  return (
    <div>
      <div className='w-[100%] bg=[rgb(205, 217, 225)] min-h-[100vh] py-[50px] px-[5%]'>
        <div className='w-[100%] border-[3px] border-solid border-[rgb(0, 153, 203)] rounded-[5px] p-[10px]'>
          <h2>General Instructions:</h2>
          <h4>1. All questions are compulsory.</h4>
          <h4>2. You can bookmark any question.</h4>
          <h4>3. Answers can be updated anytime before the time limit.</h4>
          <h4>
            4. This test is time bound,there's a timer on the right panel.
          </h4>
          <h4>
            5. Click on 'End Test' button to submit test before time limit.
            &nbsp;
          </h4>
          <h4>
            6. The test will be automatically submitted when the clock reads
            0:0.
          </h4>
          <h4>
            <b>NOTE :</b>To save answers,click on the 'Save & Next' button.
          </h4>
          <div className='w-[100%] pt-[20px] pr-[0px] pb-[40px] pl-[0px]'>
            <Button
              style={{ float: 'right' }}
              type='primary'
              icon={<CaretRightOutlined />}
              onClick={() => {
                props.ProceedtoTest(
                  props.trainee.testid,
                  props.trainee.traineeid,
                  () => {
                    props.fetchTestdata(
                      props.trainee.testid,
                      props.trainee.traineeid
                    );
                  }
                );
              }}
              loading={props.trainee.proceedingToTest}
            >
              Proceed To Test
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Instruction;

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

// export default connect(mapStateToProps, {
//   ProceedtoTest,
//   fetchTestdata,
// })(Instruction);
