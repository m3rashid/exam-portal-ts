import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnProps,
  Typography,
} from 'antd';
import Alert from 'components/common/alert';
import {
  givenComponents,
  givenDifficulties,
  givenExams,
  givenLevels,
  givenSchools,
  givenYears,
} from 'components/common/constants';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
// import { ChangeSubjectTableData } from "../../../actions/adminAction";
// import "./allquestion.css";
// import { SecurePost } from "../../../services/axiosCall";
// import apis from "../../../services/Apis";
// import NewQuestionForm from "../newquestion/newquestion";
// import QuestionDetails from "../questionDetails/questiondetails";

export interface IAllQuestions {}

const AllQuestions: React.FC<IAllQuestions> = (props) => {
  const [state, setState] = useState({
    questiondetailsId: null,
    questiondetailsModelVisible: false,
  });

  const OpendetailsModal = (id) => {
    setState({
      questiondetailsId: id,
      questiondetailsModelVisible: true,
    });
  };

  const ClosedetailsModal = () => {
    setState({
      questiondetailsId: null,
      questiondetailsModelVisible: false,
    });
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    props.ChangeQuestionSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    props.ChangeQuestionSearchText('');
  };

  useEffect(() => {
    console.log('all uestions karan');
    props.ChangeSubjectTableData();
    props.ChangeQuestionTableData(props.trainer.selectedSubjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNewModal = (mode) => {
    props.ChangeQuestionModalState(true);
  };

  const closeNewModal = () => {
    props.ChangeQuestionModalState(false);
  };

  const handleSubjectChange = (s) => {
    props.ChangeSelectedSubjects(s);
    props.ChangeQuestionTableData(s);
  };

  const deleteQuestion = (id) => {
    SecurePost({
      url: `${apis.DELETE_QUESTION}`,
      data: { _id: id },
    })
      .then((response) => {
        if (response.data.success) {
          Alert('success', 'Success', response.data.message);
          props.ChangeQuestionTableData(props.trainer.selectedSubjects);
        } else return Alert('warning', 'Warning!', response.data.message);
      })
      .catch((error) => Alert('error', 'Error!', 'Server Error'));
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnProps<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[props.trainer.QuestionsearchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Subject',
      dataIndex: 'subject.topic',
      key: 'subject.topic',
      width: '10%',
    },
    {
      title: 'Question',
      dataIndex: 'body',
      key: 'body',
      width: '20%',
      ...getColumnSearchProps('body'),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: '10%',
      sorter: (a, b) => a.level > b.level,
      render: (l) => {
        const columnData = givenLevels.find((lv) => lv.value === l);
        const lvl = columnData ? columnData.label : '';
        return <span>{lvl}</span>;
      },
      filters: givenLevels.map((lv) => ({ text: lv.label, value: lv.value })),
      onFilter: (value, record) => record.level.startsWith(value.toLowerCase()),
      filterSearch: true,
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: '10%',
      sorter: (a, b) => a.difficulty > b.difficulty,
      render: (l) => {
        const columnData = givenDifficulties.find((df) => df.value === l);
        const d = columnData ? columnData.label : '';
        return <span>{d}</span>;
      },
      filters: givenDifficulties.map((df) => {
        return {
          text: df.label,
          value: df.value,
        };
      }),
      onFilter: (value, record) =>
        record.difficulty.startsWith(value.toLowerCase()),
      filterSearch: true,
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      width: '10%',
      sorter: (a, b) => a.school > b.school,
      render: (l) => {
        const columnData = givenSchools.find((df) => df.value === l);
        const d = columnData ? columnData.label : '';
        return <span>{d}</span>;
      },
      filters: givenSchools.map((df) => {
        return {
          text: df.label,
          value: df.value,
        };
      }),
      onFilter: (value, record) => record.school.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Exam',
      dataIndex: 'exam',
      key: 'exam',
      width: '10%',
      sorter: (a, b) => a.exam > b.exam,
      render: (l) => {
        const columnData = givenExams.find((df) => df.value === l);
        const d = columnData ? columnData.label : '';
        return <span>{d}</span>;
      },
      filters: givenExams.map((df) => {
        return {
          text: df.label,
          value: df.value,
        };
      }),
      onFilter: (value, record) => record.exam.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
      width: '10%',
      sorter: (a, b) => a.component > b.component,
      render: (l) => {
        const columnData = givenComponents.find((df) => df.value === l);
        const d = columnData ? columnData.label : '';
        return <span>{d}</span>;
      },
      filters: givenComponents.map((df) => {
        return {
          text: df.label,
          value: df.value,
        };
      }),
      onFilter: (value, record) => record.component.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: '10%',
      sorter: (a, b) => a.year > b.year,
      render: (l) => {
        const columnData = givenYears.find((df) => df.value === l);
        const d = columnData ? columnData.label : '';
        return <span>{d}</span>;
      },
      filters: givenYears.map((df) => {
        return {
          text: df.label,
          value: df.value,
        };
      }),
      onFilter: (value, record) => record.year.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Action',
      key: '_id',
      dataIndex: '_id',
      width: '10%',
      render: (key) => (
        <span>
          <Button
            type='primary'
            shape='circle'
            onClick={() => OpendetailsModal(key)}
            icon='info-circle'
          />
          <Divider type='vertical' />
          <Popconfirm
            title='Are you sure？'
            cancelText='No'
            okText='Yes'
            onConfirm={() => {
              deleteQuestion(key);
            }}
            icon={<DeleteOutlined style={{ color: 'red' }} />}
          >
            <Button type='danger' shape='circle' icon='delete' />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className='admin-table-container'>
      <div>
        <Row>
          <Col span={12}>
            <Button
              type='primary'
              icon='question-circle'
              style={{ marginBottom: '10px' }}
              onClick={() => openNewModal('Add New Question')}
            >
              Add New Question
            </Button>
          </Col>
          <Col span={12}>
            <Select
              mode='multiple'
              placeholder='Select one or more subjects'
              defaultValue={props.trainer.selectedSubjects}
              onChange={handleSubjectChange}
              style={{ width: '100%' }}
              allowClear={true}
              optionFilterProp='s'
            >
              {props.admin.subjectTableData.map((item) => (
                <Select.Option key={item._id} value={item._id} s={item.topic}>
                  {item.topic}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>
      <div className='register-trainer-form-header'>
        <Typography.Title
          level={4}
          style={{ color: '#fff', textAlign: 'center' }}
        >
          List of Questions
        </Typography.Title>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={props.trainer.QuestionTableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={props.trainer.QuestionTableLoading}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      <Modal
        open={props.trainer.NewQuestionmodalOpened}
        title='New Question'
        onCancel={closeNewModal}
        style={{
          top: '20px',
          padding: '0px',
          backgroundColor: 'rgb(155,175,190)',
        }}
        width='80%'
        destroyOnClose={true}
        footer={<></>}
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
      >
        <NewQuestionForm />
      </Modal>

      <Modal
        open={state.questiondetailsModelVisible}
        title='Question Details'
        onCancel={this.ClosedetailsModal}
        style={{
          top: '20px',
          padding: '0px',
          backgroundColor: 'rgb(155,175,190)',
        }}
        width='70%'
        destroyOnClose={true}
        footer={[]}
      >
        <QuestionDetails id={state.questiondetailsId} />
      </Modal>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   trainer: state.trainer,
//   admin: state.admin,
// });

export default AllQuestions;
// connect(mapStateToProps, {
//   ChangeQuestionModalState,
//   ChangeQuestionTableData,
//   ChangeQuestionSearchText,
//   ChangeSelectedSubjects,
//   ChangeSubjectTableData,
// })(
// );
