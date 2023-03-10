import React, { useEffect } from 'react';
// import { connect } from "react-redux";
// import "./portal.css";
// import SingleQuestion from "./singleQuestion";
// import {
//   fetchTraineeTestQuestions,
//   fetchTraineeTestAnswerSheet,
// } from "../../../actions/traineeAction";

export interface IQuestion {}

const Question: React.FC<IQuestion> = (props) => {
  useEffect(() => {
    props.fetchTraineeTestQuestions(props.trainee.testid);
    props.fetchTraineeTestAnswerSheet(
      props.trainee.testid,
      props.trainee.traineeid
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-[80%] bg-[rgb(205, 217, 225)] absolute min-h-[100%] p-[10px]'>
      <div className='w[100%] bg-white rounded-[5px] p-[30px] h-[100px]'>
        {props.trainee.answers.length > 0 &&
        props.trainee.questions.length > 0 ? (
          <SingleQuestion
            mode={props.mode}
            triggerSidebar={props.triggerSidebar}
            key={props.trainee.activeQuestionIndex}
          />
        ) : null}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   trainee: state.trainee,
// });

export default Question;
// connect(mapStateToProps, {
//   fetchTraineeTestQuestions,
//   fetchTraineeTestAnswerSheet,
// })(
// );
