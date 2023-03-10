import { Button, Popconfirm } from 'antd';
import Alert from 'components/common/alert';
import React from 'react';
import { Post } from 'services/axios';
// import { connect } from "react-redux";
// import "./portal.css";
// import Trainee from "./user";
// import { Button, Popconfirm } from "antd";
// import Operations from "./operations";
// import Clock from "./clock";
// import Alert from "../../common/alert";
// import apis from "../../../services/Apis";
// import { Post } from "../../../services/axiosCall";
// import { fetchTestdata } from "../../../actions/traineeAction";

export interface ISidepanel {}

const Sidepanel: React.FC<ISidepanel> = () => {
  const endTest = () => {
    Post({
      url: `${apis.END_TEST}`,
      data: {
        testid: props.trainee.testid,
        userid: props.trainee.traineeid,
      },
    })
      .then((response) => {
        if (response.data.success) {
          props.fetchTestdata(props.trainee.testid, props.trainee.traineeid);
        } else {
          return Alert('error', 'Error!', response.data.message);
        }
      })
      .catch((error) => {
        return Alert('error', 'Error!', 'Error');
      });
  };

  return (
    <div
      className={
        'side-panel-in-exam-dashboard ' +
        (props.mode === 'desktop' ? 'w-20' : 'w-100')
      }
    >
      <Trainee />
      <Clock />
      <Operations />
      <div className='End-test-container'>
        <Popconfirm
          title='Are you sure to end the test'
          onConfirm={endTest}
          okText='Yes'
          cancelText='No'
        >
          <Button type='default'>End Test</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

export default Sidepanel;
// connect(mapStateToProps, {
//   fetchTestdata,
// })(
//   );
