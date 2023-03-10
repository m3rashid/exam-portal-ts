import { HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Row, Skeleton, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import apis from 'services/apis';
import { SecureGet } from 'services/axios';

export interface IQuestionDetails {
  id: string;
}

const QuestionDetails: React.FC<IQuestionDetails> = (props) => {
  const [state, setState] = useState({ loading: true, details: null as any });

  const tabChange = (key: any) => {};

  useEffect(() => {
    var ID = props.id;
    SecureGet({ url: `${apis.FETCH_SINGLE_QUESTION}/${ID}` })
      .then((response) => {
        setState({ details: response.data.data[0], loading: false });
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optn = ['A', 'B', 'C', 'D', 'E'];
  const optionData = state.details;

  return (
    <div>
      <Skeleton loading={state.loading} active avatar>
        <Tabs defaultActiveKey='1' onChange={(e) => tabChange(e)}>
          <Tabs.TabPane
            key='1'
            tab={
              <span>
                <HomeOutlined />
                Basic Info
              </span>
            }
          >
            <div>
              <Descriptions
                bordered
                title=''
                size='small'
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label='Question Id'>
                  {props.id}
                </Descriptions.Item>
                <Descriptions.Item label='Subject'>
                  {state.details.subject.topic}
                </Descriptions.Item>
                <Descriptions.Item label='Difficulty'>
                  {state.details.difficulty}
                </Descriptions.Item>
                <Descriptions.Item label='No of Right Answers'>
                  {state.details.anscount}
                </Descriptions.Item>
                <Descriptions.Item label='Level'>
                  {state.details.level}
                </Descriptions.Item>
                <Descriptions.Item label='Weightage'>
                  {state.details.weightage}
                </Descriptions.Item>
                <Descriptions.Item label='School'>
                  {state.details.school || 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label='Year'>
                  {state.details.year || 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label='Topic'>
                  {state.details.topic || 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label='Component'>
                  {state.details.component || 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label='Exam'>
                  {state.details.exam}
                </Descriptions.Item>
                <Descriptions.Item label='Created on'>
                  {dayjs(state.details.createdAt).format(
                    'DD/ MM/YYYY , hh:mm:ss'
                  )}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            key='2'
            tab={
              <span>
                <QuestionCircleOutlined />
                Question
              </span>
            }
          >
            <div className='w-[100%]'>
              <div style={{ fontWeight: '700', paddingBottom: '20px' }}>
                {optionData.body}
              </div>
              {optionData.quesimg ? (
                <div className='w-[100%] py-[30px] px-[150px]'>
                  <img
                    alt='unable to load'
                    className='max-w-[100%] max-h-[100%]'
                    src={optionData.quesimg}
                  />
                </div>
              ) : null}
              <div>
                {optionData.isMcq ? (
                  optionData.options.map((d: any, i: number) => {
                    return (
                      <div key={i}>
                        <Row justify='center' className='w-[100%] mb-[40px]'>
                          <Col span={2}>
                            {d.isAnswer ? (
                              <Button className='green' shape='circle'>
                                {optn[i]}
                              </Button>
                            ) : (
                              <Button type='primary' shape='circle'>
                                {optn[i]}
                              </Button>
                            )}
                          </Col>
                          {d.optimg ? (
                            <Col span={6} style={{ padding: '5px' }}>
                              <img
                                alt='unable to load'
                                className='max-w-[100%] max-h-[100%]'
                                src={d.optimg}
                              />
                            </Col>
                          ) : null}
                          {d.optimg ? (
                            <Col span={14}>{d.optbody}</Col>
                          ) : (
                            <Col span={20}>{d.optbody}</Col>
                          )}
                        </Row>
                      </div>
                    );
                  })
                ) : (
                  <>
                    Ans: &nbsp;
                    <Tag color='green' style={{ fontSize: '1.1rem' }}>
                      {optionData.customAnswer || optionData.answer}
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Skeleton>
    </div>
  );
};

export default QuestionDetails;
