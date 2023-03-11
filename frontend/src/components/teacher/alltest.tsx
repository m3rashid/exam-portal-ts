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
import { useRecoilState, useRecoilValue } from 'recoil';
import { closeModalProps, uiAtom } from 'atoms/ui';
import { studentAtom } from 'atoms/student';
import { ISubject, IUser, IdType } from 'types/models';
import { teacherAtom } from 'atoms/teacher';
import TestDetails from './testdetails/testdetails';

export interface IAllTests {}

const AllTests: React.FC<IAllTests> = () => {
  const [ui, setUi] = useRecoilState(uiAtom);
  const [student, setStudent] = useRecoilState(studentAtom);
  const teacher = useRecoilValue(teacherAtom);

  const openModal = (data: string | any) => {
    setUi((prev) => ({
      ...prev,
      modal: { data, open: true, type: 'TEST_DETAIL', name: 'Test Details' },
    }));
  };

  const closeModal = () => {
    setUi((prev) => ({ ...prev, modal: closeModalProps }));
  };

  useEffect(() => {
    // TODO: fetch all tests table data
  }, []);

  const handleSearch = (
    selectedKeys: Array<React.Key>,
    confirm: (params?: any) => void
  ) => {
    confirm();
    setStudent((prev) => ({
      ...prev,
      searchText: selectedKeys[0].toString(),
    }));
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
    setStudent((prev) => ({ ...prev, searchText: '' }));
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),

    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[student.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

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
      render: (tags: Array<ISubject>) => (
        <span>
          {tags.map((tag, i) => {
            return (
              <Tag color='geekblue' key={tag._id as any}>
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
      render: (tags: string) => (
        <span>{dayjs(tags).format('DD/ MM/YYYY')}</span>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text: IUser) => {
        return (
          <>
            <div>{text.name}</div>
            <div>{text.emailId}</div>
          </>
        );
      },
    },
    {
      title: 'Ended',
      dataIndex: 'testconducted',
      key: 'testconducted',
      render: (dead: boolean) => {
        return dead ? 'Yes' : 'No';
      },
    },
    {
      title: 'Action',
      key: '_id',
      dataIndex: '_id',
      render: (key: IdType) => (
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
        dataSource={teacher.testTableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={teacher.tableLoadingStatus}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      <Modal
        open={ui.modal.open && ui.modal.type === 'TEST_DETAIL'}
        title='Test details'
        onCancel={closeModal}
        afterClose={closeModal}
        className='top-[20px] p-0 bg-[rgb(155,175,190)]'
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

export default AllTests;
