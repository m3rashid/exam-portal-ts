import { Button, Modal, Table, TableColumnProps, Typography } from 'antd';
import React, { useEffect } from 'react';
// import { Table, Input, Button, Icon, Typography, Modal } from "antd";
// import Highlighter from "react-highlight-words";
// import { connect } from "react-redux";
// import {
//   ChangeSubjectSearchText,
//   ChangeSubjectTableData,
//   ChangeSubjectModalState,
// } from "../../../actions/adminAction";
// import "./alltopics.css";
// import NewSubjectForm from "../newTopics/newtopics";

export interface IAllTopics {}

const AllTopics: React.FC<IAllTopics> = () => {
  const openModal = (id: string, mode: string) => {
    this.props.ChangeSubjectModalState(true, id, mode);
  };

  const closeModal = () => {
    this.props.ChangeSubjectModalState(false, null, 'New Topic');
  };

  useEffect(() => {
    this.props.ChangeSubjectTableData();
  }, []);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.props.ChangeSubjectSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    this.props.ChangeSubjectSearchText('');
  };

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'topic',
      key: 'topic',
      width: '70%',
      ...this.getColumnSearchProps('topic'),
    },
    {
      title: 'Action',
      key: '_id',
      dataIndex: '_id',
      render: (key) => (
        <span>
          <Button
            type='primary'
            shape='circle'
            icon='edit'
            onClick={() => this.openModal(key, 'Save Changes')}
          />
        </span>
      ),
    },
  ];

  return (
    <div className='admin-table-container'>
      <Button
        type='primary'
        icon='file-text'
        style={{ marginBottom: '10px' }}
        onClick={() => this.openModal(null, 'Add Subject')}
      >
        Add New Subject
      </Button>
      <div className='register-trainer-form-header'>
        <Typography.Title
          level={4}
          style={{ color: '#fff', textAlign: 'center' }}
        >
          List of Subjects
        </Typography.Title>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={this.props.admin.subjectTableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={this.props.admin.SubjectTableLoading}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      <Modal
        open={this.props.admin.SubjectmodalOpened}
        title={false}
        onOk={this.handleOk}
        onCancel={closeModal}
        style={{
          top: '20px',
          padding: '0px',
          backgroundColor: 'rgb(155,175,190)',
        }}
        bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
        destroyOnClose={true}
        footer={[]}
      >
        <NewSubjectForm />
      </Modal>
    </div>
  );
};

export default AllTopics;

/*
class AllTopics extends Component {
 

  componentDidMount() {
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.props.admin.SubjectsearchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });


  render() {
    const { Title } = Typography;}
}

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  ChangeSubjectSearchText,
  ChangeSubjectTableData,
  ChangeSubjectModalState,
})(AllTopics);
*/
