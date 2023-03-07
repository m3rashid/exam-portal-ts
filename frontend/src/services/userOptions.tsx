import {
  BookOutlined,
  CopyOutlined,
  EditOutlined,
  FileTextOutlined,
  FormOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';

export interface IUserOptions {
  display: string;
  icon: ReactNode;
  link: string;
}

const commons: IUserOptions[] = [
  {
    display: 'Welcome',
    icon: <HomeOutlined />,
    link: '/user/home',
  },
];

export const studentPermissions: IUserOptions[] = [...commons];

export const otherPermissions: IUserOptions[] = [...commons];

export const adminPermissions: IUserOptions[] = [
  ...commons,
  {
    display: 'All Teachers',
    icon: <UserOutlined />,
    link: '/user/list-teachers',
  },
  {
    display: 'All Courses',
    icon: <BookOutlined />,
    link: '/user/listsubjects',
  },
  {
    display: 'All Subjects',
    icon: <FileTextOutlined />,
    link: '/user/listsubjects',
  },
];

export const teacherPermissions: IUserOptions[] = [
  ...commons,
  {
    display: 'All Questions',
    icon: <FormOutlined />,
    link: '/user/listquestions',
  },
  {
    display: 'All Tests',
    icon: <CopyOutlined />,
    link: '/user/listtests',
  },
  {
    display: 'New Test',
    icon: <EditOutlined />,
    link: '/user/newtest',
  },
  {
    display: 'Conduct Test',
    icon: <EditOutlined />,
    link: '/user/conducttest',
  },
];
