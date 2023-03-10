import { Button, Form, Input, Select } from 'antd';
import { adminAtom } from 'atoms/admin';
import { uiAtom } from 'atoms/ui';
import Alert from 'components/common/alert';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';

export interface INewTeacher {}

const NewTeacher: React.FC<INewTeacher> = (props) => {
  const setUi = useSetRecoilState(uiAtom);
  const admin = useRecoilValue(adminAtom);

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await SecurePost({
        url: `${apis.CREATE_TEACHER}`,
        data: {
          _id: admin.teacher?._id,
          name: values.name,
          password: values.password,
          emailid: values.emailid,
          contact: values.prefix + values.contact,
        },
      });

      if (data.success) {
        Alert('success', 'Success', data.message);
        // TODO: get all Teachers here
      } else {
        return Alert('warning', 'Warning!', data.message);
      }
    } catch (err: any) {
      return Alert('error', 'Error!', err.message || 'Server Error');
    } finally {
      setUi((prev) => ({
        ...prev,
        modal: { data: null, name: 'REGISTER', open: false },
      }));
    }
  };

  return (
    <div className='w-[100%] rounded-[5px]'>
      <div className='w-[100%]'>
        <Form onFinish={handleSubmit} name='register'>
          <Form.Item
            initialValue={admin.teacher?.name}
            name='name'
            label='Name'
            hasFeedback
            className='w-[90%] ml-[5%]'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {!admin.teacher?._id ? (
            <Form.Item
              label='E-mail'
              hasFeedback
              className='w-[90%] ml-[5%]'
              name='emailId'
              initialValue={admin.teacher?.email}
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null}

          <Form.Item
            name='contact'
            initialValue={admin.teacher?.contact}
            label='Phone Number'
            className='w-[90%] ml-[5%]'
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { len: 8, message: 'Contact number must be 8 digit long' },
            ]}
          >
            <Input
              min={8}
              max={8}
              addonBefore={
                <Form.Item
                  name='prefix'
                  initialValue={admin.teacher?.prefix || '+65'}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter contact number prefix',
                    },
                  ]}
                >
                  <Select style={{ width: 70 }}>
                    <Select.Option value='+65'>+65</Select.Option>
                  </Select>
                </Form.Item>
              }
            />
          </Form.Item>

          {!admin.teacher?._id ? (
            <div>
              <Form.Item
                label='Password'
                hasFeedback
                className='w-[90%] ml-[5%]'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Confirm Password'
                hasFeedback
                className='w-[90%] ml-[5%]'
                name='confirm'
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {admin.teacher?.mode} Teacher
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewTeacher;
