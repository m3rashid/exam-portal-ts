import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from 'atoms/auth';
import { uiAtom } from 'atoms/ui';
import authService from 'services/auth';
import { Button, Layout, Menu, Tooltip } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Welcome from 'components/dashboard/welcome';
import Alert from 'components/common/alert';
import {
  adminPermissions,
  otherPermissions,
  studentPermissions,
  teacherPermissions,
} from 'services/userOptions';
import AllTeachers from 'components/admin/allTeachers';
import Newtest from 'components/teacher/newtest/newtest';
import queryString from 'query-string';
import Conducttest from 'components/teacher/conducttest';
import ErrorPage from './error';
import AllQuestions from 'components/teacher/allquestion';
import AllSubjects from 'components/admin/allSubjects';

export interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [ui, setUi] = useRecoilState(uiAtom);

  const toggleSidebar = () => {
    setUi((p) => ({ ...p, collapsed: !p.collapsed }));
  };

  const getUser = async () => {
    try {
      if (auth.isLoggedIn && !!auth.user) return;
      const token = authService.retriveToken();
      if (!token) {
        setAuth((p) => ({ ...p, isLoggedIn: false, user: null }));
        window.location.href = '/';
        return;
      }

      const { data } = await authService.fetchAuth(token);
      setAuth((p) => ({
        ...p,
        isLoggedIn: true,
        user: {
          ...data.user,
          userOptions:
            data.user.type === 'ADMIN'
              ? adminPermissions
              : data.user.type === 'TEACHER'
              ? teacherPermissions
              : data.user.type === 'STUDENT'
              ? studentPermissions
              : otherPermissions,
        },
      }));

      var subUrl = this.props.match.params.options;
      var obj = this.props.user.userOptions.find((o, i) => {
        if (o.link === `/user/${subUrl}`) {
          return o;
        }
      });
      var tt = this.props.user.userOptions.indexOf(obj);
      if (tt === -1) {
        window.location.href = `${this.props.user.userOptions[0].link}`;
      } else {
        this.props.changeActiveRoute(String(tt));
      }
    } catch (error) {
      Alert('warning', 'Warning!', 'Server Error.');
      authService.deleteToken();
      window.location.href = '/';
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  const logout = () => {
    authService.deleteToken();
    setAuth((p) => ({ ...p, isLoggedIn: false, user: null }));
    window.location.href = '/';
  };

  const GetRender: React.FC = () => {
    switch (this.props.match.params.options) {
      case 'listTeachers':
        return <AllTeachers />;
      case 'listSubjects':
        return <AllSubjects />;
      case 'listQuestions':
        return <AllQuestions />;
      case 'listTests':
        return <AllTests />;
      case 'home':
        return <Welcome />;
      case 'newTest':
        return <Newtest />;
      case 'conductTest':
        return (
          <Conducttest {...queryString.parse(this.props.location.search)} />
        );
      default:
        return <ErrorPage />;
    }
  };

  return (
    <Layout>
      <Layout.Sider
        trigger={null}
        collapsible
        theme='light'
        collapsed={ui.collapsed}
        className='overflow-hidden h-[100vh] fixed left-0 z-[5]'
      >
        <div className='w-[120px] h-[31px] bg=[rgba(255, 255, 255, 0.2)] mt-[16px] mr-[24px] mb-[16px] ml-0 float-left z-10' />
        <Menu
          defaultSelectedKeys={[this.props.user.activeRoute]}
          mode='inline'
          theme='light'
        >
          {this.props.user.userOptions.map((d, i) => {
            return (
              <Menu.Item key={i}>
                {d.icon}
                <span>{d.display}</span>
                <Link to={d.link}></Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header className='fixed w-[100vw] pl=[10px] z-[1000] bg-[#465d72]'>
          {ui.collapsed ? (
            <MenuUnfoldOutlined
              className='leading-[64px] py-0 px-[24px] text-[#fff] text-[20px] p-[20px]'
              onClick={toggleSidebar}
            />
          ) : (
            <MenuFoldOutlined
              className='leading-[64px] py-0 px-[24px] text-[#fff] text-[20px] p-[20px]'
              onClick={toggleSidebar}
            />
          )}

          <ul className='fixed top-0 right-0 flex flex-wrap justify-center items-center list-none float-left'>
            <li>
              <Tooltip placement='bottom' title='Log Out'>
                <Button
                  type='primary'
                  size='large'
                  shape='circle'
                  onClick={logout}
                >
                  <LogoutOutlined />
                </Button>
              </Tooltip>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <img
                className='p-[5px] h-[55px] mt-[-17px]'
                src='/main.png'
                alt='company logo'
              />
            </li>
          </ul>
        </Layout.Header>
        <Layout.Content className='my-[24px] mx-[16px] p-[24px] bg-[rgb(205,217,225)] min-h-[80vh] ml-[95px]'>
          <div className='w-[100%]'>
            <GetRender />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

// changeActiveRoute,
