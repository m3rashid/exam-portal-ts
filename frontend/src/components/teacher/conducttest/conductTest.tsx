import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import TestDetails from './details';
import Candidates from './candidates';
import Questions from './questions';

export interface IConductTestProps {}

const ConductTest: React.FC<IConductTestProps> = () => {
  // props.changeConducttestId(props.testid);
  const [state, setState] = useState({
    localTestId: null as any,
    needRedirect: false,
  });

  const changeLocalTestId = (e: any) => {
    setState((prev) => ({ ...prev, localTestId: e.target.value }));
  };

  const changetestId = () => {
    setState((prev) => ({ ...prev, needRedirect: true }));
  };

  if (state.needRedirect) {
    window.location.href = `/user/conducttest?testid=${state.localTestId}`;
    return null;
  }

  return (
    <div className='min-h-[80vh]'>
      {!props.conduct.id ? (
        <div>
          <Typography.Title
            style={{ width: '100%', textAlign: 'center' }}
            level={4}
          >
            Enter Test Id
          </Typography.Title>
          <div
            className='w-[30%] ml-[35%] p-[50px] rounded-[5px] text-center'
            style={{
              background:
                'linear-gradient(to right,rgb(183, 233, 247),rgb(219, 243, 250),rgb(245, 252, 255))',
            }}
          >
            <Input
              placeholder='Enter test id'
              onChange={changeLocalTestId}
              value={state.localTestId}
            />
            <Button
              onClick={changetestId}
              type='primary'
              style={{ marginTop: '30px' }}
            >
              Proceed
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* <InnerComponent key={props.conduct.basictestdetails.testconducted} /> */}
          {props.conduct.basictestdetails.testconducted ? (
            <div
              style={{
                background:
                  'linear-gradient(to right,rgb(183, 233, 247), rgb(219, 243, 250),rgb(245, 252, 255))',
              }}
              className='rounded-[5px] w-[50%] ml-[25%] mt-[80px] min-h-[100px] p-[40px] text-center text-white'
            >
              <Typography.Title
                style={{
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '50px',
                }}
                level={4}
              >
                The Test has ended! Go to all tests to check the results
              </Typography.Title>
            </div>
          ) : (
            <div>
              <TestDetails />
              <Tabs defaultActiveKey='1' style={{ marginTop: '20px' }}>
                <Tabs.TabPane
                  tab={
                    <span>
                      <UserOutlined />
                      Registered Student
                    </span>
                  }
                  key='1'
                >
                  <Candidates />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <span>
                      <QuestionCircleOutlined />
                      Questions
                    </span>
                  }
                  key='2'
                >
                  <Questions
                    id={props.conduct.id}
                    questionsOfTest={props.conduct.questionsOfTest}
                    updateQuestiosnTest={props.updateQuestiosnTest}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConductTest;
