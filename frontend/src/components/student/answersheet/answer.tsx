import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Modal,
  Row,
  Skeleton,
  Table,
  Tag,
  Typography,
} from 'antd';
import { authAtom } from 'atoms/auth';
import Alert from 'components/common/alert';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import apis from 'services/apis';
import { Post } from 'services/axios';
// import {
//   Table,
//   Icon,
//   Tag,
//   Skeleton,
//   Descriptions,
//   Modal,
//   Button,
//   Row,
//   Col,
//   Typography,
// } from "antd";
// import { connect } from "react-redux";

// import "./answer.css";
// import "./answermobileview.css";
// import "./individualquestion_mobileview.css";
// import { Post } from "../../../services/axiosCall";
// import apis from "../../../services/Apis";
// import Alert from "../../common/alert";
// import Feedback from "./feedback";
// import { FeedbackStatus } from "../../../actions/traineeAction";

// const { Title } = Typography;

export interface ISingleQuestionDetailsProps {
  qId: string;
}

interface ISingleState {
  fetching: boolean;
  qDetails: any;
}

export const SingleQuestionDetails: React.FC<ISingleQuestionDetailsProps> = ({
  qId,
}) => {
  const initialState: ISingleState = {
    fetching: false,
    qDetails: null,
  };

  const toRunBefore = async () => {
    setState((p) => ({ ...p, fetching: true }));
    try {
      const { data } = await Post({
        url: apis.FETCH_SINGLE_QUESTION_BY_TRAINEE,
        data: { qId },
      });

      if (data.success) {
        setState((p) => ({ ...p, qDetails: data.data[0] }));
      } else Alert('error', 'Error !', data.message);
    } catch (err) {
      console.log(err);
      Alert('error', 'Error !', 'Server Error');
    } finally {
      setState((p) => ({ ...p, fetching: false }));
    }
  };

  useEffect(() => {
    toRunBefore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<ISingleState>(initialState);
  const optn = ['A', 'B', 'C', 'D', 'E'];

  if (!state.qDetails) {
    return (
      <div className='skeletor-wrapper'>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <div>
      <div className='mainQuestionDetailsContaine'>
        <div
          className='questionDetailsBody'
          style={{ fontWeight: '900', fontSize: '1.4rem' }}
        >
          {state.qDetails.body}
        </div>
        {state.qDetails.quesimg ? (
          <div className='questionDetailsImageContainer'>
            <img
              alt='Unable to load'
              className='questionDetailsImage'
              src={state.qDetails.quesimg}
            />
          </div>
        ) : null}
        <div>
          {state.qDetails.options.map((d, i) => {
            return (
              <div key={i}>
                <Row justify='center' className='QuestionDetailsOptions'>
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
                        alt='Unable to load'
                        className='questionDetailsImage'
                        src={d.optimg}
                        style={{ width: '100%' }}
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
          })}
        </div>
      </div>
      <div className='ml-[10px]'>
        <strong>Explanation</strong> : <span>{state.qDetails.explanation}</span>
      </div>

      <div className='ml-[10px]'>
        <strong>Level</strong> : <span>{state.qDetails.level}</span>
        <br />
        <strong>Difficulty</strong> : <span>{state.qDetails.difficulty}</span>
      </div>
    </div>
  );
};

export interface IAnswerProps {}

interface IState {
  loading: boolean;
  data: Array<any>;
  totalScore: number | null;
  mVisible: boolean;
  activeQuestionId: string | null;
}

const Answer: React.FC<IAnswerProps> = () => {
  const initialState: IState = {
    loading: false,
    data: [],
    totalScore: null,
    mVisible: false,
    activeQuestionId: null,
  };
  const [state, setState] = useState<IState>(initialState);
  const { user } = useRecoilValue(authAtom);

  useEffect(() => {}, []);

  const handleCancel = () => {
    setState((p) => ({ ...p, mVisible: false }));
  };

  const openModel = (qId: string) => {
    setState((p) => ({ ...p, activeQuestionId: qId, mVisible: true }));
  };

  const columns = [
    {
      title: 'View Question',
      key: 'action',
      render: (text, record) => (
        <Button
          shape='circle'
          icon={<InfoOutlined />}
          type='primary'
          size='small'
          onClick={() => openModel(text.qid)}
        />
      ),
    },
    {
      title: 'Correct Answers',
      key: 'correctAnswer',
      dataIndex: 'correctAnswer',
      render: (tags) => (
        <span>
          {tags.length > 0 &&
            tags.map((tag) => {
              if (!tag) return <></>;
              return (
                <Tag color='green' key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </span>
      ),
    },
    {
      title: 'Given Answers',
      key: 'givenAnswer',
      dataIndex: 'givenAnswer',
      render: (tags) => (
        <span>
          {tags.length > 0 &&
            tags.map((tag) => {
              if (!tag) return <></>;
              return (
                <Tag color='blue' key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </span>
      ),
    },
    {
      title: 'Weightage',
      dataIndex: 'weightage',
      key: 'weightage',
    },
    {
      title: 'Status',
      dataIndex: 'iscorrect',
      key: 'iscorrect',
      render: (tags) => (
        <span>
          {tags ? (
            <CheckCircleTwoTone twoToneColor='#52c41a' />
          ) : (
            <CloseCircleTwoTone twoToneColor='red' />
          )}
        </span>
      ),
    },
  ];

  return (
    <div className='answer-table-outer'>
      <Typography.Title className='answer-table-heading' level={4}>
        Your Test Results
      </Typography.Title>

      <div className='answer-table-wrapper'>
        <Descriptions bordered title={null} size='small'>
          <Descriptions.Item label='Name'>{user?.name}</Descriptions.Item>
          <Descriptions.Item label='Email Id'>
            {user?.emailId}
          </Descriptions.Item>
          <Descriptions.Item label='Contact'>{user?.contact}</Descriptions.Item>
          <Descriptions.Item label='Score'>
            {state.totalScore}
          </Descriptions.Item>
        </Descriptions>

        <br />

        <Table
          size='small'
          rowKey='qid'
          loading={state.loading}
          columns={columns}
          dataSource={state.data}
          pagination={false}
          style={{ backgroundColor: '#fff', padding: '10px' }}
        />

        {this.props.trainee.hasGivenFeedBack ? null : <Feedback />}
        <Modal
          destroyOnClose={true}
          width='70%'
          className='top-[30px]'
          title='Question details'
          open={state.mVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          footer={null}
        >
          <SingleQuestionDetails qId={state.activeQuestionId} />
        </Modal>
      </div>
    </div>
  );
};

export default Answer;

/*

class Answer extends React.Component {
  componentDidMount() {
    let { traineeid, testid } = this.props.trainee;
    this.setState({ loading: true });

    let p1 = Post({
      url: apis.FETCH_OWN_RESULT,
      data: { userid: traineeid, testid: testid },
    });

    let p2 = Post({
      url: `${apis.FETCH_TRAINEE_TEST_QUESTION}`,
      data: { id: testid },
    });

    let p3 = Post({
      url: `${apis.FEEDBACK_STATUS_CHECK}`,
      data: { userid: traineeid, testid: testid },
    });

    Promise.all([p1, p2, p3])
      .then((d) => {
        this.setState({ loading: false });
        if (d[0].data.success && d[1].data.success) {
          let v = d[1].data.data;
          let r = d[0].data.result.result.map((dd, i) => ({ ...dd, ...v[i] }));
          this.setState({
            data: r,
            TotalScore: d[0].data.result.score,
          });
          if (d[2].data.success) this.props.FeedbackStatus(d[2].data.status);
        } else {
          Alert(
            'error',
            'Error!',
            `${d[0].data.success ? '' : d[0].data.message} and ${
              d[1].data.success ? '' : d[1].data.message
            }`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        Alert('error', 'Error!', 'Server Error');
      });
  }
}

*/
