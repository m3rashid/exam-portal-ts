import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import Alert from 'components/common/alert';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authAtom } from 'atoms/auth';
import { IUserType, userTypesList } from 'types/models';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import authService from 'services/auth';
import {
  adminPermissions,
  otherPermissions,
  studentPermissions,
  teacherPermissions,
} from 'services/userOptions';

export interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [state, setState] = useState<{ authType: IUserType }>({
    authType: 'ADMIN',
  });

  const changeAuthType = (selected: IUserType) => {
    if (!userTypesList.includes(selected)) return;
    setState({ authType: selected });
  };

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await authService.loginAuth(
        values.email,
        values.password,
        state.authType
      );
      if (!data.success) {
        return Alert('error', 'Error!', data.message);
      }
      setAuth({
        isLoggedIn: true,
        user: {
          ...data.user,
          userOptions:
            state.authType === 'ADMIN'
              ? adminPermissions
              : state.authType === 'TEACHER'
              ? teacherPermissions
              : state.authType === 'STUDENT'
              ? studentPermissions
              : otherPermissions,
        },
      });
    } catch (error: any) {
      console.log(error);
      return Alert('error', 'Error!', 'Server Error');
    }
  };

  if (auth.isLoggedIn) {
    return <Navigate to={auth.user?.userOptions[0].link!!} />;
  }

  return (
    <div className='flex flex-wrap flex-col justify-center h-[450px] w-[500px] rounded-[5px]'>
      <div className='py-[50px] px-[30px]'>
        <Typography.Title level={2} className='text-center font-bold'>
          Sign In
        </Typography.Title>

        {userTypesList.map((type) => (
          <div className='register_login_switch first:rounded-l-[8px] first:border-r-0 last:rounded-l-[8px] last:border-l-0'>
            <span
              onClick={() => changeAuthType(type)}
              className={
                state.authType === type
                  ? 'bg-[#267693] text-white cursor-default'
                  : ''
              }
            >
              {type}
            </span>
          </div>
        ))}

        <Form onFinish={handleSubmit} name='login'>
          <Form.Item
            hasFeedback
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
