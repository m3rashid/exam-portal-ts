import Alert from 'components/common/alert';
import React, { useEffect, useState } from 'react';
import apis from 'services/apis';
import { Post } from 'services/axios';
// import { connect } from "react-redux";
// import { LocaltestDone, fetchTestdata } from "../../../actions/traineeAction";
// import "./portal.css";
// import apis from "../../../services/Apis";
// import { Post } from "../../../services/axiosCall";
// import Alert from "../../common/alert";

export interface IClockProps {}

const Clock: React.FC<IClockProps> = () => {
  const [state, setState] = useState({
    localMinutes: props.trainee.m_left,
    localSeconds: props.trainee.s_left,
  });

  useEffect(() => {
    this.clockF();
  }, []);

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

  const clockF = () => {
    let c = setInterval(() => {
      let l = this.state.localMinutes;
      let s = this.state.localSeconds;
      if (l === 0 && s === 1) {
        clearInterval(c);
        endTest();
      } else {
        if (s === 0) {
          s = 59;
          l--;
        } else s--;

        setState({ localMinutes: l, localSeconds: s });
      }
    }, 1000);
  };

  return (
    <div className='clock-wrapper'>
      <div className='clock-container'>
        {this.state.localMinutes} : {this.state.localSeconds}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  trainee: state.trainee,
});

export default connect(mapStateToProps, {
  LocaltestDone,
  fetchTestdata,
})(Clock);
