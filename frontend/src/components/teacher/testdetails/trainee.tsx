import React from 'react';
import { Table, Card, TableColumnProps } from 'antd';

export interface ITraineeProps {
  maxmMarks: number;
  id: string;
  stats: any
}

const Trainee: React.FC<ITraineeProps> = (props) => {
  let maxMarks = props.maxmMarks || 2;

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'userid.name',
      key: 'userid.name',
    },
    {
      title: 'Email Id',
      dataIndex: 'userid.emailid',
      key: 'userid.emailid',
    },
    {
      title: 'Contact No',
      dataIndex: 'userid.contact',
      key: 'userid.contact',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Max Marks',
      dataIndex: 'maxMarks',
      key: '_id',
      render: (tag) => <span>{maxMarks}</span>,
    },
    {
      title: 'Details',
      dataIndex: 'userid._id',
      key: 'userid._id',
      render: (tag) => {
        return (
          <span>
            <a
              target='_blank'
              rel='noreferrer noopener'
              href={`/trainee/taketest?testid=${props.id}&traineeid=${tag}`}
            >
              View Answer Sheet
            </a>
          </span>
        );
      },
    },
  ];
  return (
    <div>
      <Card>
        <div className='download-section'>
          <Table
            pagination={false}
            rowKey='_id'
            columns={columns}
            dataSource={props.stats}
            style={{ backgroundColor: '#fff', padding: '10px' }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Trainee;
