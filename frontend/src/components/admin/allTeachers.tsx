import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Table,
  TableColumnProps,
  Typography,
} from 'antd';
import Alert from 'components/common/alert';
import React, { useEffect, useState } from 'react';
import apis from 'services/apis';
import { SecurePost } from 'services/axios';
import Highlighter from 'react-highlight-words';
import { useRecoilState } from 'recoil';
import { IModalName, uiAtom } from 'atoms/ui';
import { colors } from 'components/common/constants';
import { teacherAtom } from 'atoms/teacher';
import NewTeacherForm from './newTeacher';

export interface IAllTeachers {}

const AllTeachers: React.FC<IAllTeachers> = (props) => {
  const [ui, setUi] = useRecoilState(uiAtom);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useRecoilState(teacherAtom);

  const openModal = (id: string, mode: IModalName) => {
    setUi((prev) => ({ ...prev, modal: { name: mode, data: id, open: true } }));
  };

  const closeModal = () => {
    setUi((prev) => ({
      ...prev,
      modal: { data: null, name: 'REGISTER', open: false },
    }));
  };

  useEffect(() => {
    // TODO: reload teacher table data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTeacher = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await SecurePost({
        url: `${apis.DELETE_TEACHER}`,
        data: { _id: id },
      });

      if (data.success) {
        Alert('success', 'Success', data.message);
        // TODO: reload teachers table data
      } else {
        return Alert('warning', 'Warning!', data.message);
      }
    } catch (err: any) {
      return Alert('error', 'Error!', err.messsge || 'Server Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (
    selectedKeys: Array<React.Key>,
    confirm: (params?: any) => void
  ) => {
    confirm();
    setTeacher((prev) => ({ ...prev, searchText: selectedKeys[0].toString() }));
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
    setTeacher((prev) => ({ ...prev, searchText: '' }));
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

    onFilter: (value, record) => {
      const isValid = record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
      return !!isValid;
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[teacher.searchText]}
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
      render: (key) => {
        if (loading) return <Spin />;
        return (
          <>
            <Button
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => openModal(key, 'SAVE_CHANGES')}
            />
            <Divider type='vertical' />
            <Popconfirm
              title='Are you sure ?'
              cancelText='No'
              okText='Yes'
              onConfirm={() => {
                deleteTeacher(key);
              }}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            >
              <Button
                type='primary'
                style={{ background: colors.danger }}
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className='w-[100%] p-[20px] min-h-[80vh]'>
      <Button
        type='primary'
        icon='user-add'
        style={{ marginBottom: '10px' }}
        onClick={() =>
          // openModal(null, 'Register')
          setUi((prev) => ({
            ...prev,
            modal: { data: null, name: 'REGISTER', open: true },
          }))
        }
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
        dataSource={teacher.tableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={teacher.tableLoadingStatus}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      ;
      <Modal
        open={ui.modal.open && ui.modal.name === 'REGISTER'}
        title={false}
        // onOk={handleOk}
        onCancel={closeModal}
        className='bg-[rgb(155,175,190)] top-[20px] p-0'
        width='40%'
        destroyOnClose={true}
        footer={[]}
      >
        <NewTeacherForm />
      </Modal>
    </div>
  );
};

export default AllTeachers;
