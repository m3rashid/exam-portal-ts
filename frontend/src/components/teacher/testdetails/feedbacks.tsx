import React from 'react';
import {
  Card,
  // Rate,
  // Comment,
  // Avatar,
} from 'antd';

export interface IFeedback {
  feedbacks: Array<{
    userId: string;
    email: string;
    name: string;
  }>;
}

const Feedback: React.FC<IFeedback> = (props) => {
  return (
    <div>
      <Card>
        <div className='download-section'>
          <h3>
            <b>Feedbacks</b>
          </h3>
          <div>
            {props.feedbacks.map((d, i) => {
              return (
                <Card key={i} style={{ marginBottom: '10px' }}>
                  {/* <Comment
                    author={`${d.userid.name} - ${d.userid.emailid}`}
                    avatar={
                      <Avatar
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        alt={d.userid.name}
                      />
                    }
                    content={
                      <span>
                        <Rate size='small' disabled defaultValue={d.rating} />
                        <p>{d.feedback}</p>
                      </span>
                    }
                  /> */}
                </Card>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Feedback;
