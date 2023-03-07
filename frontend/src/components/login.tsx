import React from 'react';
import { Form, Input, Button } from 'antd';
// import { connect } from 'react-redux';
// import { login, logout } from '../../../actions/loginAction';
// import auth from '../../../services/AuthServices';
import Alert from 'components/common/alert';
import { Navigate } from 'react-router-dom';

export interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const changeAuthType = (selected: string) => {
    if (selected !== 'ADMIN' && selected !== 'TRAINER') return;
    setState({ authType: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth
          .LoginAuth(values.email, values.password, this.state.authType)
          .then((response) => {
            if (response.data.success) {
              this.props.login(response.data.user);
              auth.storeToken(response.data.token);
              this.setState({
                isLoggedIn: true,
              });
            } else {
              return Alert(
                'error',
                'Error!',
                response.data.message.replaceAll('TRAINER', 'TEACHER')
              );
            }
          })
          .catch((error) => {
            console.log(error);
            return Alert('error', 'Error!', 'Server Error');
          });
      }
    });
  };

  if (this.state.isLoggedIn) {
    return <Navigate to={this.props.user.userOptions[0].link} />;
  }

  return (
    <div className='login-container'>
      <div className='login-inner'>
        <h1>Sign In</h1>
        <div className='register_login_switch'>
          <span
            onClick={() => changeAuthType('TRAINER')}
            className={`${this.state.authType === 'TRAINER' ? 'selected' : ''}`}
          >
            Teacher
          </span>
          <span
            onClick={() => this.changeAuthType('ADMIN')}
            className={`${this.state.authType === 'ADMIN' ? 'selected' : ''}`}
          >
            Admin
          </span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Email'
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
              />
            )}
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

/* 

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  

  

  render() {
    const { getFieldDecorator } = this.props.form;
     else {
      return (
        
      );
    }
  }
}

const LoginForm = Form.create({ name: "login" })(Login);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  login,
  logout,
})(LoginForm);

*/
