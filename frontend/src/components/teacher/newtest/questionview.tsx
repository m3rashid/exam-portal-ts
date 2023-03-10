import { Button } from 'antd';
import Alert from 'components/common/alert';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
// import { connect } from "react-redux";
// import { Row, Col, Button } from "antd";
// import { SecurePost } from "../../../services/axiosCall";
// import apis from "../../../services/Apis";
// import Alert from "../../common/alert";
// import { Redirect } from "react-router-dom";

export interface IFinalQuestionView {}

const FinalQuestionView: React.FC<IFinalQuestionView> = (props) => {
  const [state, setState] = useState({
    testId: null,
  });

  const createTest = () => {
    SecurePost({
      url: apis.CREATE_TEST,
      data: {
        type: props.test.newtestFormData.testType,
        title: props.test.newtestFormData.testTitle,
        questions: props.test.newtestFormData.testQuestions,
        duration: props.test.newtestFormData.testDuration,
        subjects: props.test.newtestFormData.testSubject,
        organisation: props.test.newtestFormData.OrganisationName,
      },
    })
      .then((response) => {
        if (response.data.success) {
          Alert(
            'success',
            'Test paper Created Successfully!',
            'Please wait, you will automatically be redirected to conduct test page.'
          );
          setTimeout(() => {
            this.setState({
              testid: response.data.testid,
            });
            window.location.reload();
          }, 3000);
        } else {
          Alert('error', 'Error!', response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert('error', 'Error!', 'Server Error');
      });
  };

  if (state.testId) {
    return <Navigate to={`/user/conducttest?testid=${state.testId}`} />;
  }

  return (
    <div>
      {props.test.newtestFormData.testQuestions.map((d, i) => {
        return <Q key={i + 1} _id={d} no={i + 1} />;
      })}
      <div style={{ width: '100%', padding: '10px' }}>
        <Button style={{ float: 'right' }} type='primary' onClick={createTest}>
          Create Test
        </Button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   test: state.test,
// });

export default FinalQuestionView;

function QuestionView(props) {
  var _id = props._id;
  var no = props.no;
  var obj = props.test.questionsAvailablebasedonSubject.filter((hero) => {
    return hero._id === _id;
  });

  var oo = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div>
        <Row>
          <Col span={20}>
            <b style={{ float: 'left' }}>Q. {no}&#41; &nbsp;</b>
            {obj[0].body}
            {obj[0].quesimg ? (
              <img alt='Question' src={obj[0].quesimg} />
            ) : null}

            <br />

            {obj[0].isMcq ? (
              <div style={{ width: '100%' }}>
                {obj[0].options.map((d, i) => {
                  return (
                    <Col key={i} span={12} style={{ padding: '10px 20px' }}>
                      <b>{oo[i]} &#41; </b> {d.optbody}
                      {d.optimg ? <img alt='Option' src={d.optimg} /> : null}
                    </Col>
                  );
                })}
              </div>
            ) : (
              <Col style={{ padding: '10px 20px' }}></Col>
            )}
          </Col>
          <Col span={4}>
            <b style={{ float: 'right' }}>Marks: {obj[0].weightage}</b>
          </Col>
        </Row>
      </div>
    </div>
  );
}

var Q = connect(mapStateToProps, null)(QuestionView);
