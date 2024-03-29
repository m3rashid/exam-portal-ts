const envoirnment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL: envoirnment === 'development' ? 'http://localhost:3000' : '',
  BASE: envoirnment === 'development' ? 'http://localhost:5000' : '',
  LOGIN: '/login/',
  GET_USER_DETAILS: '/user/details',
  GET_ALL_TEACHER: '/admin/teacher/details/all',
  GET_SINGLE_TEACHER_DETAILS: '/admin/teacher/details',
  CREATE_TEACHER: '/admin/teacher/create',
  DELETE_TEACHER: '/admin/teacher/remove',
  GET_ALL_SUBJECTS: '/subject/details/all',
  GET_SINGLE_SUBJECT_DETAILS: '/subject/details',
  CREATE_SUBJECT: '/subject/create',
  GET_ALL_QUESTIONS: '/questions/details/all',
  DELETE_QUESTION: '/questions/delete',
  FETCH_SINGLE_QUESTION: '/questions/details',
  CREATE_QUESTIONS: '/questions/create',
  FILE_UPLOAD: '/upload',
  CREATE_TEST: '/test/create',
  GET_ALL_TESTS: '/test/details/all',
  GET_SINGLE_TEST: '/test/teacher/details',
  REGISTER_TRAINEE_FOR_TEST: '/trainee/enter',
  RESEND_TEACHER_REGISTRATION_LINK: '/trainee/resend/testlink',
  GET_SINGLE_TEST_DETAILS_BASIC: '/test/basic/details',
  STOP_REGISTRATION: '/teacher/registration/stop',
  START_TEST_BY_TEACHER: '/test/begin',
  GET_TEST_CANDIDATES: '/test/candidates',
  GET_TEST_QUESTIONS: '/test/questions',
  FETCH_TRAINEE_DETAILS: '/trainee/details',
  FETCH_TRAINEE_TEST_DETAILS: '/trainee/flags',
  PROCEED_TO_TEST: '/trainee/answersheet',
  FETCH_TRAINEE_TEST_QUESTION: '/trainee/paper/questions',
  FETCH_TRAINEE_TEST_ANSWERSHEET: '/trainee/chosen/options',
  UPDATE_ANSWERS: '/trainee/update/answer',
  END_TEST: '/trainee/end/test',
  FETCH_OWN_RESULT: '/final/results',
  FETCH_SINGLE_QUESTION_BY_TRAINEE: '/trainee/get/question',
  END_TEST_BY_TEACHER: '/test/end',
  FEEDBACK_STATUS_CHECK: '/trainee/feedback/status',
  GIVE_FEEDBACK: '/trainee/feedback',
  GET_STATS: '/test/candidates/details',
  GET_EXCEL: '/teacher/result/download',
  MAX_MARKS_FETCH: '/test/max/marks',
  GET_FEEDBACKS: '/teacher/get/feedbacks',
  CHECK_TEST_NAME: '/test/new/name/check',
} as const;

export default apis;
