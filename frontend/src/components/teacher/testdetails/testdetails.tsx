import {
  CopyOutlined,
  HomeOutlined,
  MessageOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Descriptions, Input, Skeleton, Tabs } from 'antd';
import React, { useState } from 'react';
import Feedback from './feedbacks';
import Stats from './stats';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dayjs from 'dayjs';
// // import Lottie from "react-lottie";
// import { Tabs, Icon, Descriptions, Skeleton, Tag, Input, message } from 'antd';
// import { connect } from 'react-redux';
// import './testdetails.css';
// import Questions from '../conducttest/questions';
// import { updateQuestiosnActiveTest } from '../../../actions/trainerAction';
// import { SecurePost } from '../../../services/axiosCall';
// import apis from '../../../services/Apis';
// import moment from 'moment';
// import Alert from '../../common/alert';
// import Stats from './stats';
// import Trainee from './trainee';
// import FeedBacks from './feedbacks';
// const { TabPane } = Tabs;
// import animationData from "../../../animations/under-construction.json";

// const lottieOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

export interface ITestDetailProps {}

const TestDetails: React.FC<ITestDetailProps> = (props) => {
  const [state, setState] = useState({
    // id: this.props.trainer.DataActiveTestDetails.testDetailsId,
    testdetails: null,
    stats: null,
    file: null,
    loading: true,
    maxMarks: 0,
    mainlink: '',
    feedbacks: [],
  });

  const tabChange = (key: any) => {};

  if (state.loading) {
    return (
      <div className='skeletor-wrapper'>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  const { testdetails, id } = state;

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
                value={`${this.props.trainer.DataActiveTestDetails.testDetailsId}`}
                addonAfter={
                  <CopyToClipboard
                    text={`${this.props.trainer.DataActiveTestDetails.testDetailsId}`}
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
                value={`${this.state.mainlink}user/conducttest?testid=${id}`}
                addonAfter={
                  <CopyToClipboard
                    text={`${this.state.mainlink}user/conducttest?testid=${id}`}
                    onCopy={() => message.success('Link Copied to clipboard')}
                  >
                    <CopyOutlined />
                  </CopyToClipboard>
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label='Test Name'>
              {testdetails.title}
            </Descriptions.Item>
            <Descriptions.Item label='Subject'>
              <span>
                {testdetails.subjects.map((tag, i) => {
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
              {dayjs(testdetails.createdAt).format('DD/ MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>
        {testdetails.testconducted ? (
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
              id={this.props.trainer.DataActiveTestDetails.testDetailsId}
              questionsOfTest={
                this.props.trainer.DataActiveTestDetails.testquestions
              }
              updateQuestiosnTest={this.props.updateQuestiosnActiveTest}
            />
          </Tabs.TabPane>
        ) : null}
        {testdetails.testconducted ? (
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='user' />
                Students
              </span>
            }
            key='3'
          >
            <Trainee
              maxmMarks={this.state.maxMarks}
              id={this.state.id}
              stats={this.state.stats}
            />
          </Tabs.TabPane>
        ) : null}
        {testdetails.testconducted ? (
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
              id={state.id}
              stats={state.stats}
              file={state.file}
              maxmMarks={state.maxMarks}
            />
          </Tabs.TabPane>
        ) : null}
        {testdetails.testconducted ? (
          <Tabs.TabPane
            tab={
              <span>
                <MessageOutlined />
                Feedbacks
              </span>
            }
            key='5'
          >
            <Feedback feedbacks={state.feedbacks} />
          </Tabs.TabPane>
        ) : null}
      </Tabs>
    </div>
  );
};

/*
class TestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = ;
  }


  componentDidMount() {
    var link = window.location.href.split('/').splice(0, 3);
    var mainlink = '';
    link.forEach((d, i) => {
      mainlink = mainlink + d + '/';
    });
    this.setState({ mainlink });
    var p1 = SecurePost({
      url: `${apis.GET_SINGLE_TEST}`,
      data: {
        id: this.state.id,
      },
    });
    var p2 = SecurePost({
      url: apis.GET_STATS,
      data: {
        testid: this.state.id,
      },
    });

    var p3 = SecurePost({
      url: apis.GET_EXCEL,
      data: {
        id: this.state.id,
      },
    });
    var p4 = SecurePost({
      url: apis.MAX_MARKS_FETCH,
      data: {
        testid: this.state.id,
      },
    });
    var p5 = SecurePost({
      url: apis.GET_FEEDBACKS,
      data: {
        testid: this.state.id,
      },
    });
    Promise.all([p1, p2, p3, p4, p5])
      .then((response) => {
        if (
          response[0].data.success &&
          response[1].data.success &&
          response[2].data.success &&
          response[3].data.success &&
          response[4].data.success
        ) {
          this.setState({
            testdetails: response[0].data.data,
            stats: response[1].data.data,
            file: response[2].data.file,
            maxMarks: response[3].data.data,
            loading: false,
            feedbacks: response[4].data.data,
          });
        } else {
          Alert(
            'error',
            'Error !',
            response[0].data.message +
              ' ' +
              response[1].data.message +
              ' ' +
              response[2].data.message
          );
        }
      })
      .catch((error) => {
        console.log(error);
        Alert('error', 'Error !', 'Server Error.');
      });
  }

  render() {
    if (this.state.loading) {
     ;
    } else {
      ;
      return ();
    }
  }
}

const mapStateToProps = (state) => ({
  trainer: state.trainer,
});

export default connect(mapStateToProps, {
  updateQuestiosnActiveTest,
})(TestDetails);
*/
