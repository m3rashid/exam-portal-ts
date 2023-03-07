import React from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'atoms/auth';

const admin_powers = [
  'Create/Update/Remove new Subjects',
  "Create/Remove/Update Teacher's Data",
];

const teacher_powers = [
  'Create/Update/Remove Questions',
  'Create Test Papers from the created questions',
  'Performance analysis of the students',
  'Get the list of students who have attempted the test',
  'Control the start and end time for the test',
  "Send Test Paper's link (test ID) to the students",
];

const student_powers = [
  'Attempt the test papers',
  'View the results and Paper Analysis',
  'Give Feedback to the teacher',
];

export interface IWelcomeProps {}

const Welcome: React.FC<IWelcomeProps> = () => {
  const auth = useRecoilValue(authAtom);
  const isLoggedIn = auth.isLoggedIn;

  if (!isLoggedIn || !auth.user) {
    return (
      <div className='flex flex-wrap justify-center items-center min-h-[80vh]' />
    );
  }

  const { name, type, contact, emailId } = auth.user;

  const powers =
    type === 'ADMIN'
      ? admin_powers
      : type === 'TEACHER'
      ? teacher_powers
      : type === 'STUDENT'
      ? student_powers
      : [];

  return (
    <div className='flex flex-wrap justify-center items-center min-h-[80vh]'>
      <div className='w-[40%] p-[2rem]'>
        <h1>Name: {name}</h1>
        <h2>Email: {emailId}</h2>
        <h2>Contact: {contact}</h2>
        <h2>Logged In As: {type}</h2>

        <br />
        <div className=''>
          <h2>What you can do as {type}:</h2>
          <ul className='p-l-[32px]'>
            {powers.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-[60%]'>
        <img className='mt-[1.5rem]' src='/mainsss.png' alt='img'></img>
        <h1 className='mt-[1.5rem] text-[2rem]'>Examination Portal</h1>
      </div>
    </div>
  );
};

export default Welcome;
