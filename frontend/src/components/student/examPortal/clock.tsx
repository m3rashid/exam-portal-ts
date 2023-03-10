import { authAtom } from 'atoms/auth';
import { studentAtom } from 'atoms/student';
import Alert from 'components/common/alert';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import apis from 'services/apis';
import { Post } from 'services/axios';
// import "./portal.css";

export interface IClockProps {}

const Clock: React.FC<IClockProps> = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const { user } = useRecoilValue(authAtom);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      let l = student.testDetails?.minutesLeft!!;
      let s = student.testDetails?.secondsLeft!!;
      if (l === 0 && s === 1) {
        clearInterval(clockInterval);
        endTest();
        return;
      }

      if (s === 0) {
        s = 59;
        l--;
      } else s--;

      setStudent((prev) => ({
        ...prev,
        ...(prev.testDetails
          ? {
              testDetails: {
                ...prev.testDetails,
                minutesLeft: l,
                secondsLeft: s,
              },
            }
          : null),
      }));
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endTest = () => {
    Post({
      url: `${apis.END_TEST}`,
      data: {
        testId: student.testDetails?._id,
        userId: user?._id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          propsfetchTestdata(props.trainee.testid, props.trainee.traineeid);
        } else {
          return Alert('error', 'Error!', response.data.message);
        }
      })
      .catch((error) => {
        return Alert('error', 'Error!', 'Error');
      });
  };

  return (
    <div className='clock-wrapper'>
      <div className='clock-container'>
        {student.testDetails?.minutesLeft} : {student.testDetails?.secondsLeft}
      </div>
    </div>
  );
};

export default Clock;

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

// export default connect(mapStateToProps, {
//   LocaltestDone,
//   fetchTestdata,
// })(Clock);
