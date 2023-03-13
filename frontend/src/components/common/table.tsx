import React, { useEffect, useState } from 'react';
import {
  Button,
  Descriptions,
  Form,
  Modal,
  Skeleton,
  Table,
  TableColumnProps,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import { RecoilState, useRecoilState } from 'recoil';
import {
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

export interface FormResponseError {
  field: string;
  message: string;
}

export interface ICustomTableProps<RecordType> extends TableProps<RecordType> {
  endpoints: {
    get: string;
    edit: string;
    delete: string;
    create?: string;
    detailInfo?: string;
  };
  includeMeta?: boolean;
  columns: TableColumnProps<RecordType>[];
  addButtonLabel?: string; // this also defines the 'allow add' permission
  editButtonLabel?: string; // this also defines the 'allow edit' permission
  AddEditFormInner: React.ReactNode;
  recoilAtom: RecoilState<Array<Partial<RecordType>>>;
  customFormValidation?: (
    values: any
  ) => FormResponseError[] | Promise<FormResponseError[]>;
}

interface IActionModal {
  loading: boolean;
  open: boolean;
  type: 'DELETE' | 'INFO';
  data: any | null;
}

const initialActionsModal: IActionModal = {
  loading: false,
  open: false,
  type: 'DELETE',
  data: null,
};

function CustomTable<RecordType = unknown>({
  endpoints,
  includeMeta = true,
  AddEditFormInner,
  addButtonLabel,
  editButtonLabel,
  columns,
  recoilAtom,
  customFormValidation,
  ...props
}: ICustomTableProps<RecordType>) {
  const [form] = Form.useForm();
  const initialState = { loading: false, open: false, disable: false };
  const [modal, setModal] = useState(initialState);
  const [tableData, setTableData] = useRecoilState(recoilAtom);
  const [actionModal, setActionsModal] =
    useState<IActionModal>(initialActionsModal);

  const handleEdit = async () => {};

  const handleDelete = async () => {};

  const handleMoreInfo = async () => {};

  const closeModal = () => setModal(initialState);
  const closeActionModal = () => setActionsModal(initialActionsModal);

  const handleActionModalOk = async () => {
    if (actionModal.type === 'DELETE') {
      await handleDelete();
    }
    closeActionModal();
  };

  const handleFormFinish = async () => {};

  const handleFormFinishFailed = async () => {};

  const allCols: TableColumnProps<RecordType>[] = [
    {
      title: 'Sl.No.',
      render: (_, __, index) => index + 1,
      width: 60,
    },
    ...columns,
    {
      title: '',
      width: 130,
      render: (text, record) => {
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Tooltip title='Edit this entry'>
              <Button
                type='primary'
                icon={<EditOutlined />}
                onClick={handleEdit}
              />
            </Tooltip>

            <Tooltip title='Delete this entry'>
              <Button
                type='primary'
                // style={{ background: constants.dangerColor }}
                icon={<DeleteOutlined />}
                onClick={() =>
                  setActionsModal({
                    data: record,
                    loading: false,
                    open: true,
                    type: 'DELETE',
                  })
                }
              />
            </Tooltip>

            <Tooltip title='Know more'>
              <Button
                type='primary'
                // style={{ background: constants.infoColor }}
                icon={<InfoOutlined />}
                onClick={() =>
                  setActionsModal({
                    data: record,
                    loading: false,
                    open: true,
                    type: 'INFO',
                  })
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
    ...(includeMeta
      ? [
          {
            title: 'Created On',
            dataIndex: 'createdAt',
            render: (text: string) => dayjs(text).format('DD/MM/YYYY'),
          },
          {
            title: 'Last Updated',
            dataIndex: 'updatedAt',
            render: (text: string) => dayjs(text).format('DD/MM/YYYY'),
          },
        ]
      : []),
  ];

  const refreshEntries = async () => {
    const {
      data: { data, error },
    } = await axios.get(endpoints.get);
    console.log(data);
    setTableData(data);
  };

  useEffect(() => {
    if (tableData.length > 0) return;
    refreshEntries();
  }, []);

  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <>
      <Modal
        footer={null}
        onCancel={closeModal}
        open={modal.open}
        title={
          <Typography.Title
            style={{ textAlign: 'center', margin: 20 }}
            level={3}
          >
            {addButtonLabel}
          </Typography.Title>
        }
      >
        {modal.loading ? (
          <Skeleton active />
        ) : (
          <Form
            form={form}
            name={addButtonLabel}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleFormFinish}
            onFinishFailed={handleFormFinishFailed}
            disabled={modal.disable}
          >
            {AddEditFormInner}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                marginRight: '25px',
                gap: '10px',
              }}
            >
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={modal.disable}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={closeModal} disabled={modal.disable}>
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </Modal>

      <Modal
        title={
          <Typography.Title
            style={{ textAlign: 'center', margin: 20 }}
            level={3}
          >
            {actionModal.type === 'DELETE' ? 'Confirm Deletion' : 'Info'}
          </Typography.Title>
        }
        open={actionModal.open}
        onCancel={closeActionModal}
        onOk={handleActionModalOk}
      >
        {actionModal.type === 'DELETE' ? (
          <Typography.Text style={{ textAlign: 'center' }}>
            Are you sure you want to delete this entry ?
          </Typography.Text>
        ) : (
          <>
            <Descriptions>
              {Object.entries(actionModal.data).map(([k, v]) => (
                <Descriptions.Item label={k}>{v as string}</Descriptions.Item>
              ))}
            </Descriptions>
          </>
        )}
      </Modal>

      <div
        className='center-all'
        style={{
          gap: '10px',
          justifyContent: 'end',
          margin: '10px',
          paddingTop: '10px',
        }}
      >
        <Button icon={<ReloadOutlined />} onClick={refreshEntries} />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setModal((p) => ({ ...p, open: true }))}
        >
          {addButtonLabel || 'Add'}
        </Button>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          size='small'
          sticky
          // @ts-ignore
          columns={allCols}
          // @ts-ignore
          rowKey={(record: RecordType) => record._id}
          // @ts-ignore
          dataSource={tableData as Array<RecordType>}
          {...props}
        />
      </div>
    </>
  );
}

export default CustomTable;
