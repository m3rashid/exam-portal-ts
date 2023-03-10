import { Button, Form, Input } from 'antd';
import { adminAtom } from 'atoms/admin';
import { uiAtom } from 'atoms/ui';
import Alert from 'components/common/alert';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';

export interface INewSubject {}

const NewSubjectForm: React.FC<INewSubject> = () => {
  const admin = useRecoilValue(adminAtom);
  const setUi = useSetRecoilState(uiAtom);

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await SecurePost({
        url: `${apis.CREATE_SUBJECT}`,
        data: {
          _id: admin.subject?._id,
          topic: values.topic,
        },
      });

      if (data.success) {
        Alert('success', 'Success', data.message);
        // TODO: refresh subjects data
      } else {
        return Alert('warning', 'Warning!', data.message);
      }
    } catch (err) {
      return Alert('error', 'Error!', 'Server Error');
    } finally {
      setUi((prev) => ({
        ...prev,
        modal: { data: null, open: false, name: 'NEW_SUBJECT' },
      }));
    }
  };

  return (
    <div className='register-subject-form'>
      <div className='register-trainer-form-body'>
        <Form name='register' onFinish={handleSubmit}>
          <Form.Item
            label='Subject Name'
            hasFeedback
            className='input-admin-trainer'
            name='topic'
            initialValue={admin.subject?.topic}
            rules={[
              {
                required: true,
                message: 'Please input subject name!',
                whitespace: true,
              },
            ]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {admin.subject?.mode} Subject
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewSubjectForm;
