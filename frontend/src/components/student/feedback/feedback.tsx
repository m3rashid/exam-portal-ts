import React from 'react';
import './feedback.css';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <div className='feedback-header'></div>
        <div className='feedback-content'></div>
        <div className='feedback-footer'></div>
      </div>
    );
  }
}
