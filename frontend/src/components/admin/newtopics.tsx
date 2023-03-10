import { Button, Form, Input } from 'antd';
import Alert from 'components/common/alert';
import React from 'react';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
// import './newtopic.css';
// import { Form, Input, Button } from 'antd';
// import { connect } from 'react-redux';
// import { SecurePost } from '../../../services/axiosCall';
// import apis from '../../../services/Apis';
// import Alert from '../../../components/common/alert';
// import {
//   ChangeSubjectConfirmDirty,
//   ChangeSubjectTableData,
//   ChangeSubjectModalState,
// } from '../../../actions/adminAction';

export interface INewTopics {}

const NewTopics: React.FC<INewTopics> = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        SecurePost({
          url: `${apis.CREATE_SUBJECT}`,
          data: {
            _id: this.props.admin.SubjectId,
            topic: values.topic,
          },
        })
          .then((response) => {
            if (response.data.success) {
              this.props.ChangeSubjectModalState(false, null, 'New Topic');
              Alert('success', 'Success', response.data.message);
              this.props.ChangeSubjectTableData();
            } else {
              this.props.ChangeSubjectModalState(false, null, 'New Topic');
              return Alert('warning', 'Warning!', response.data.message);
            }
          })
          .catch((error) => {
            this.props.ChangeSubjectModalState(false, null, 'New Topic');
            return Alert('error', 'Error!', 'Server Error');
          });
      }
    });
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
            initialValue={this.props.admin.subjectDetails.topic}
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
              {this.props.admin.Subjectmode}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewTopics;

/*
class NewTopics extends Component {
  
}

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps, {
  ChangeSubjectConfirmDirty,
  ChangeSubjectTableData,
  ChangeSubjectModalState,
})(NewSubjectForm);
*/
