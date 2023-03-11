import React, { useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Typography,
  Modal,
  Tag,
  TableColumnProps,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// import { connect } from "react-redux";
// import {
//   ChangeTestSearchText,
//   ChangeTestTableData,
//   ChangeTestDetailsModalState,
// } from "../../../actions/trainerAction";
// import "./alltest.css";
// import moment from "moment";

// import TestDetails from "../testdetails/testdetails";

export interface IAllTests {}

const AllTests: React.FC<IAllTests> = () => {
  const openModal = (data: string | any) => {
    props.ChangeTestDetailsModalState(true, data);
  };

  const closeModal = () => {
    props.ChangeTestDetailsModalState(false, null);
  };

  useEffect(() => {
    props.ChangeTestTableData();
  }, []);

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
          icon='search'
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
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[props.trainer.TestsearchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    props.ChangeTestSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    props.ChangeTestSearchText('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Subjects',
      dataIndex: 'subjects',
      key: 'subjects._id',
      render: (tags) => (
        <span>
          {tags.map((tag, i) => {
            let color = 'geekblue';
            return (
              <Tag color={color} key={tag._id}>
                {tag.topic.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },

    {
      title: 'Created on',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getColumnSearchProps('createdAt'),
      render: (tags) => <span>{dayjs(tags).format('DD/ MM/YYYY')}</span>,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text) => {
        return (
          <>
            <div>{text.name}</div>
            <div>{text.emailid}</div>
          </>
        );
      },
    },
    {
      title: 'Ended',
      dataIndex: 'testconducted',
      key: 'testconducted',
      render: (dead) => {
        return dead ? 'Yes' : 'No';
      },
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
            icon='info-circle'
            onClick={() => openModal(key)}
          />
        </span>
      ),
    },
  ];

  return (
    <div className='admin-table-container'>
      <div className='register-trainer-form-header'>
        <Typography.Title className='text-white text-center' level={4}>
          List of Tests
        </Typography.Title>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={props.trainer.TestTableData}
        size='medium'
        pagination={{ pageSize: 10 }}
        loading={props.trainer.TestTableLoading}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      <Modal
        open={props.trainer.TestDetailsmodalOpened}
        title='Test details'
        onOk={handleOk}
        onCancel={closeModal}
        afterClose={closeModal}
        style={{
          top: '20px',
          padding: '0px',
          backgroundColor: 'rgb(155,175,190)',
        }}
        width='80%'
        bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
        destroyOnClose={true}
        footer={[]}
      >
        <TestDetails />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trainer: state.trainer,
  };
};

export default connect(mapStateToProps, {
  ChangeTestSearchText,
  ChangeTestTableData,
  ChangeTestDetailsModalState,
})(AllTests);
