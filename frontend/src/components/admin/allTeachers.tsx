import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableColumnProps,
  Typography,
} from 'antd';
import Alert from 'components/common/alert';
import React, { useEffect, useState } from 'react';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
import Highlighter from 'react-highlight-words';
// import {
//   Table,
//   Input,
//   Button,
//   Icon,
//   Typography,
//   Divider,
//   Modal,
//   Popconfirm,
// } from 'antd';
// import { connect } from 'react-redux';
// import {
//   ChangeTrainerSearchText,
//   ChangeTrainerTableData,
//   ChangeTrainerModalState,
// } from '../../../actions/adminAction';
// import './alltrainer.css';
// import Alert from '../../../components/common/alert';
// import { SecurePost } from '../../../services/axiosCall';
// import apis from '../../../services/Apis';
// import NewTrainerForm from '../newTrainer/newtrainer';

export interface IAllTeachers {}

const AllTeachers: React.FC<IAllTeachers> = (props) => {
  const [state, setState] = useState({ loading: false });

  const openModal = (id, mode) => {
    props.ChangeTrainerModalState(true, id, mode);
  };

  const closeModal = () => {
    props.ChangeTrainerModalState(false, null, 'Register');
  };

  useEffect(() => {
    props.ChangeTrainerTableData();
  }, []);

  const deleteTrainer = (id) => {
    SecurePost({
      url: `${apis.DELETE_TEACHER}`,
      data: {
        _id: id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          Alert('success', 'Success', response.data.message);
          props.ChangeTrainerTableData();
        } else {
          return Alert('warning', 'Warning!', response.data.message);
        }
      })
      .catch((error) => {
        return Alert('error', 'Error!', 'Server Error');
      });
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    props.ChangeTrainerSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    props.ChangeTrainerSearchText('');
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
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm)}
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[props.admin.TrainersearchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email Id',
      dataIndex: 'emailid',
      key: 'emailid',
      width: '25%',
      ...getColumnSearchProps('emailid'),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact',
      key: 'contact',
      ...getColumnSearchProps('contact'),
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
            onClick={() => openModal(key, 'Save Changes')}
          />
          <Divider type='vertical' />
          <Popconfirm
            title='Are you sure？'
            cancelText='No'
            okText='Yes'
            onConfirm={() => {
              deleteTrainer(key);
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
    <div className='w-[100%] p-[20px] min-h-[80vh]'>
      <Button
        type='primary'
        icon='user-add'
        style={{ marginBottom: '10px' }}
        onClick={() => openModal(null, 'Register')}
      >
        Add New Teacher
      </Button>
      <div className='register-trainer-form-header'>
        <Typography.Title
          level={4}
          style={{ color: '#fff', textAlign: 'center' }}
        >
          List of Teachers
        </Typography.Title>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={props.admin.trainerTableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={props.admin.trainerTableLoadingStatus}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      ;
      <Modal
        open={props.admin.TrainermodalOpened}
        title={false}
        onOk={handleOk}
        onCancel={closeModal}
        style={{
          top: '20px',
          padding: '0px',
          backgroundColor: 'rgb(155,175,190)',
        }}
        width='40%'
        destroyOnClose={true}
        footer={[]}
      >
        <NewTrainerForm />
      </Modal>
    </div>
  );
};

export default AllTeachers;

// const mapStateToProps = (state) => ({
//   admin: state.admin,
// });

// export default connect(mapStateToProps, {
//   ChangeTrainerSearchText,
//   ChangeTrainerTableData,
//   ChangeTrainerModalState,
// })(AllTrainer);
