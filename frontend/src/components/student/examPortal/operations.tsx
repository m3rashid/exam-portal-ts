import React from 'react';
import { Badge, Button, Row, Col } from 'antd';
import { FlagFilled } from '@ant-design/icons';
// import { connect } from 'react-redux';
// import './portal.css';
// import { switchQuestion } from '../../../actions/traineeAction';

export interface IOperations {}

const Operations: React.FC<IOperations> = () => {
  return (
    <div className='p-[20px]'>
      <div
        className='w-[100%] bg-white rounded-[5px]'
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <Row style={{ padding: '5px' }}>
          {props.trainee.answers.map((d, i) => {
            return (
              <Col key={i} span={6} style={{ padding: '10px' }}>
                <Mark
                  qId={d.questionid}
                  ans={d.isAnswered}
                  mark={d.isMarked}
                  no={i}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

interface IMarkProps {
  qId: string;
  ans: string;
  mark: boolean;
  no: number;
}

const Mark: React.FC<IMarkProps> = (props) => {
  if (props.mark) {
    if (props.ans) {
      return (
        <Badge
          className='qb'
          count={<FlagFilled style={{ color: '#f5222d' }} />}
        >
          <Button
            onClick={() => props.switchQuestion(props.no)}
            style={{ background: '#0B6623', color: '#fff' }}
          >
            {props.no + 1}
          </Button>
        </Badge>
      );
    } else {
      return (
        <Badge
          className='qb'
          count={<FlagFilled style={{ color: '#f5222d' }} />}
        >
          <Button
            onClick={() => props.switchQuestion(props.no)}
            style={{ background: '#999999', color: '#fff' }}
          >
            {props.no + 1}
          </Button>
        </Badge>
      );
    }
  } else {
    if (props.ans) {
      return (
        <Button
          onClick={() => props.switchQuestion(props.no)}
          className='qb'
          style={{ background: '#0B6623', color: '#fff' }}
        >
          {props.no + 1}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => props.switchQuestion(props.no)}
          className='qb'
          style={{ background: '#999999', color: '#fff' }}
        >
          {props.no + 1}
        </Button>
      );
    }
  }
};

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

// let Mark = connect(mapStateToProps, {
//   switchQuestion,
// })(mark);

export default Operations;
