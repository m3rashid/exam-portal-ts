import { Button, Input, Rate } from 'antd';
import { authAtom } from 'atoms/auth';
import Alert from 'components/common/alert';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import apis from 'services/apis';
import { Post } from 'services/axios';

export interface IFeedbackProps {}

interface IState {
  star: number;
  comment: string;
  loading: boolean;
}

const Feedback: React.FC<IFeedbackProps> = () => {
  const { user } = useRecoilValue(authAtom);
  const initialState: IState = {
    star: 0,
    comment: '',
    loading: false,
  };
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [state, setState] = useState<IState>(initialState);

  const handleStarChange = (star: number) => {
    setState((p) => ({ ...p, star }));
  };

  const onCommentChange = (comment: string) => {
    setState((p) => ({ ...p, comment }));
  };

  const submitFeedback = async () => {
    try {
      if (state.comment.length === 0) return;
      setState((p) => ({ ...p, loading: true }));

      const { data } = await Post({
        url: apis.GIVE_FEEDBACK,
        data: {
          testId: user?.currentTestId,
          userId: user?._id,
          rating: state.star,
          feedback: state.comment,
        },
      });

      if (data.success) {
        setState((p) => ({ ...p, loading: false }));
        Alert('success', 'Success', 'Thanks for your feedback');
        return;
      }

      setState((p) => ({ ...p, loading: false }));
      Alert('error', 'Failed', data.message);
    } catch (error) {
      console.log(error);
      Alert('error', 'Failed', 'Server Error');
      setState((p) => ({ ...p, loading: false }));
    }
  };

  return (
    <div className='md:w-[50%] md:ml-[25%] md:text-center md:mt-[50px]'>
      <div className='mt-[20px] md:p-[15px]'>
        <strong>Submit a Feedback</strong>
        &nbsp; &nbsp; &nbsp;
        <span>
          <Rate
            tooltips={desc}
            onChange={handleStarChange}
            value={state.star}
          />
          {state.star ? (
            <span className='ant-rate-text'>{desc[state.star - 1]}</span>
          ) : (
            ''
          )}
        </span>
      </div>
      <div className='mt-[20px] md:p-[15px]'>
        <Input.TextArea
          rows={4}
          value={state.comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </div>
      <div className='mt-[20px] md:p-[15px]'>
        <Button type='primary' onClick={submitFeedback} loading={state.loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
