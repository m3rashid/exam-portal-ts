import { Button, Form, Input, Select } from 'antd';
import Alert from 'components/common/alert';
import React from 'react';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
// import "./newtrainer.css";
// import { Form, Input, Button, Select } from "antd";
// import { SecurePost } from "../../../services/axiosCall";
// import apis from "../../../services/Apis";
// import { connect } from "react-redux";
// import {
//   ChangeTrainerConfirmDirty,
//   ChangeTrainerModalState,
//   ChangeTrainerTableData,
// } from "../../../actions/adminAction";
// import Alert from "../../../components/common/alert";
// const { Option } = Select;

export interface INewTrainer {}

const NewTrainer: React.FC<INewTrainer> = (props) => {
  const [form] = Form.useForm();

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('passwords are not same !');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && props.admin.TrainerconfirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        SecurePost({
          url: `${apis.CREATE_TEACHER}`,
          data: {
            _id: props.admin.trainerId,
            name: values.name,
            password: values.password,
            emailid: values.emailid,
            contact: values.prefix + values.contact,
          },
        })
          .then((response) => {
            if (response.data.success) {
              props.ChangeTrainerModalState(false, null, 'Register');
              Alert('success', 'Success', response.data.message);
              props.ChangeTrainerTableData();
            } else {
              props.ChangeTrainerModalState(false, null, 'Register');
              return Alert('warning', 'Warning!', response.data.message);
            }
          })
          .catch((error) => {
            props.ChangeTrainerModalState(false, null, 'Register');
            return Alert('error', 'Error!', 'Server Error');
          });
      }
    });
  };

  return (
    <div className='w-[100%] rounded-[5px]'>
      <div className='w-[100%]'>
        <Form onFinish={handleSubmit} name='register'>
          <Form.Item
            initialValue={props.admin.trainerdetails.name}
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

          {!props.admin.trainerId ? (
            <Form.Item
              label='E-mail'
              hasFeedback
              className='w-[90%] ml-[5%]'
              name='emailId'
              initialValue={props.admin.trainerdetails.emailid}
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
            initialValue={props.admin.trainerdetails.contact}
            label='Phone Number'
            className='w-[90%] ml-[5%]'
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { len: 8, message: 'Contact number must be 8 digit long' },
            ]}
          >
            <Input
              addonBefore={
                <Form.Item
                  name='prefix'
                  initialValue={props.admin.trainerdetails.prefix || '+65'}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter contact no prefix',
                    },
                  ]}
                >
                  <Select style={{ width: 70 }}>
                    <Select.Option value='+65'>+65</Select.Option>
                  </Select>
                </Form.Item>
              }
              min={8}
              max={8}
            />
          </Form.Item>

          {!props.admin.trainerId ? (
            <div>
              <Form.Item
                label='Password'
                hasFeedback
                className='w-[90%] ml-[5%]'
                name='password'
                initialValue={props.admin.trainerdetails.password}
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { validator: validateToNextPassword },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Confirm Password'
                hasFeedback
                className='w-[90%] ml-[5%]'
                name='confirm'
                initialValue={props.admin.trainerdetails.confirmpassword}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  { validator: compareToFirstPassword },
                ]}
              >
                <Input.Password onBlur={handleConfirmBlur} />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {props.admin.Trainermode}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewTrainer;

/*
class NewTrainer extends Component {}

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  ChangeTrainerConfirmDirty,
  ChangeTrainerModalState,
  ChangeTrainerTableData,
})(NewTrainerForm);
*/
