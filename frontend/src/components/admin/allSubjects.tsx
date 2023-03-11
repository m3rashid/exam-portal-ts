import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  Modal,
  Table,
  TableColumnProps,
  Typography,
} from 'antd';
import { subjectAtom } from 'atoms/subject';
import { closeModalProps, uiAtom } from 'atoms/ui';
import React, { useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { useRecoilState } from 'recoil';
import { IUserType } from 'types/models';
import NewSubjectForm from './newSubject';

export interface IAllSubjects {}

const AllSubjects: React.FC<IAllSubjects> = () => {
  const [ui, setUi] = useRecoilState(uiAtom);
  const [subject, setSubject] = useRecoilState(subjectAtom);

  const openModal = (id: string | null, name: string, type: IUserType) => {
    setUi((prev) => ({ ...prev, modal: { data: id, name, open: true, type } }));
  };

  const closeModal = () => {
    setUi((prev) => ({ ...prev, modal: closeModalProps }));
  };

  useEffect(() => {
    // TODO: get all subjects
  }, []);

  const handleSearch = (
    selectedKeys: Array<React.Key>,
    confirm: (params?: any) => void
  ) => {
    confirm();
    setSubject((prev) => ({ ...prev, searchText: selectedKeys[0].toString() }));
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
    setSubject((prev) => ({ ...prev, searchText: '' }));
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
        searchWords={[subject.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'topic',
      key: 'topic',
      width: '70%',
      ...getColumnSearchProps('topic'),
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
            onClick={() => openModal(key, 'SAVE_CHANGES', 'ADMIN')}
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
        onClick={() => openModal(null, 'ADD_SUBJECT', 'ADMIN')}
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
        dataSource={subject.tableData}
        size='middle'
        pagination={{ pageSize: 10 }}
        loading={subject.tableLoadingStatus}
        rowKey='_id'
        style={{ backgroundColor: '#fff', padding: '10px' }}
      />
      <Modal
        open={ui.modal.open && ui.modal.type === 'ADMIN'}
        title={false}
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

export default AllSubjects;
