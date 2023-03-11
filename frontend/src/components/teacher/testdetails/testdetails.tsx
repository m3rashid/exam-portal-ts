import {
  CopyOutlined,
  HomeOutlined,
  MessageOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Descriptions, Input, message, Skeleton, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import Feedback from './feedbacks';
import Stats from './stats';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dayjs from 'dayjs';
import Alert from 'components/common/alert';
import { SecurePost } from 'services/axios';
import apis from 'services/apis';
import { IdType } from 'types/models';
// import './testdetails.css';
import Questions from '../conducttest/questions';
import Student from './student';

export interface ITestDetailProps {
  activeTestId: IdType;
}

const TestDetails: React.FC<ITestDetailProps> = (props) => {
  const [state, setState] = useState({
    id: props.activeTestId,
    testdetails: null as any,
    stats: null,
    file: null,
    loading: true,
    maxMarks: 0,
    mainlink: '',
    feedbacks: [],
  });

  const tabChange = (key: any) => {};

  const getData = async () => {
    try {
      const link = window.location.href.split('/').splice(0, 3);
      let mainlink = '';
      link.forEach((d, i) => {
        mainlink = mainlink + d + '/';
      });

      setState((prev) => ({ ...prev, mainlink }));
      const p1 = SecurePost({
        url: `${apis.GET_SINGLE_TEST}`,
        data: { id: state.id },
      });
      const p2 = SecurePost({
        url: apis.GET_STATS,
        data: { testId: state.id },
      });
      const p3 = SecurePost({
        url: apis.GET_EXCEL,
        data: { id: state.id },
      });
      const p4 = SecurePost({
        url: apis.MAX_MARKS_FETCH,
        data: { testId: state.id },
      });
      const p5 = SecurePost({
        url: apis.GET_FEEDBACKS,
        data: { testId: state.id },
      });

      const [
        { data: r1 },
        { data: r2 },
        { data: r3 },
        { data: r4 },
        { data: r5 },
      ] = await Promise.all([p1, p2, p3, p4, p5]);
      if (r1.success && r2.success && r3.success && r4.success && r5.success) {
        setState((prev) => ({
          ...prev,
          testdetails: r1.data,
          stats: r2.data,
          file: r3.file,
          maxMarks: r4.data,
          loading: false,
          feedbacks: r5.data,
        }));
      } else {
        Alert(
          'error',
          'Error !',
          r1.message + ' ' + r2.message + ' ' + r3.message
        );
      }
    } catch (error: any) {
      console.log(error);
      Alert('error', 'Error !', error.message || 'Server Error.');
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.loading) {
    return (
      <div className='skeletor-wrapper'>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultActiveKey='1' onChange={(e) => tabChange(e)}>
        <Tabs.TabPane
          tab={
            <span>
              <HomeOutlined />
              Details
            </span>
          }
          key='1'
        >
          <Descriptions
            bordered
            title=''
            size='small'
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label='Test Id'>
              <Input
                disabled={true}
                value={`${props.activeTestId}`}
                addonAfter={
                  <CopyToClipboard
                    text={`${props.activeTestId}`}
                    onCopy={() => message.success('Link Copied to clipboard')}
                  >
                    <CopyOutlined />
                  </CopyToClipboard>
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label='Test Link'>
              <Input
                disabled={true}
                value={`${state.mainlink}user/conducttest?testid=${id}`}
                addonAfter={
                  <CopyToClipboard
                    text={`${state.mainlink}user/conducttest?testid=${id}`}
                    onCopy={() => message.success('Link Copied to clipboard')}
                  >
                    <CopyOutlined />
                  </CopyToClipboard>
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label='Test Name'>
              {state.testdetails.title}
            </Descriptions.Item>
            <Descriptions.Item label='Subject'>
              <span>
                {state.testdetails.subjects.map((tag, i) => {
                  let color = 'geekblue';
                  return (
                    <Tag color={color} key={tag._id}>
                      {tag.topic.toUpperCase()}
                    </Tag>
                  );
                })}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label='Created on'>
              {dayjs(state.testdetails.createdAt).format('DD/ MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>
        {state.testdetails.testconducted ? (
          <Tabs.TabPane
            key='2'
            tab={
              <span>
                <QuestionCircleOutlined />
                Questions
              </span>
            }
          >
            <Questions
              id={props.activeTestId}
              questionsOfTest={
                props.trainer.DataActiveTestDetails.testquestions
              }
              updateQuestiosnTest={props.updateQuestiosnActiveTest}
            />
          </Tabs.TabPane>
        ) : null}
        {state.testdetails?.testconducted ? (
          <Tabs.TabPane
            key='3'
            tab={
              <span>
                <UserOutlined />
                Students
              </span>
            }
          >
            <Student
              maxmMarks={state.maxMarks}
              id={state.id as any}
              stats={state.stats}
            />
          </Tabs.TabPane>
        ) : null}
        {state.testdetails.testconducted ? (
          <Tabs.TabPane
            tab={
              <span>
                <PieChartOutlined />
                Statistics
              </span>
            }
            key='4'
          >
            <Stats
              id={state.id as any}
              stats={state.stats}
              file={state.file as any}
              maxmMarks={state.maxMarks}
            />
          </Tabs.TabPane>
        ) : null}
        {state.testdetails?.testconducted ? (
          <Tabs.TabPane
            key='5'
            tab={
              <span>
                <MessageOutlined />
                Feedbacks
              </span>
            }
          >
            <Feedback feedbacks={state.feedbacks} />
          </Tabs.TabPane>
        ) : null}
      </Tabs>
    </div>
  );
};

export default TestDetails;
