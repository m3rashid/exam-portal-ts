import React from 'react';
import './backbone.css';
import { connect } from 'react-redux';
import AllTrainer from '../admin/allTrainer/alltrainer';
import AllTopics from '../admin/allTopics/alltopics.js';
import AllQuestions from '../teacher/allquestions/allquestion';
import AllTests from '../teacher/alltests/alltest';
import ConductTest from '../teacher/conducttest/conducttest';
import NewTest from '../teacher/newtest/newtest';
import auth from '../../services/AuthServices';
import Welcome from './welcome';
import ErrorPage from './errorPage';
import { login, logout } from '../../actions/loginAction';
import { changeActiveRoute } from '../../actions/useraction';
import Alert from '../common/alert';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, Menu, Button, Icon, Tooltip } from 'antd';
import main from './main.png';
const { Header, Sider, Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalIsLoggedIn: this.props.user.isLoggedIn,
      collapsed: true,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logOut = () => {
    auth.deleteToken();
    window.location.href = '/';
  };

  componentWillMount() {
    var t = auth.retriveToken();
    if (this.state.LocalIsLoggedIn) {
    } else if (t && t !== 'undefined') {
      auth
        .FetchAuth(t)
        .then((response) => {
          this.props.login(response.data.user);
          this.setState({
            LocalIsLoggedIn: true,
          });
          var subUrl = this.props.match.params.options;
          // eslint-disable-next-line
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
        })
        .catch((error) => {
          Alert('warning', 'Warning!', 'Server Error.');
          auth.deleteToken();
          window.location.href = '/';
        });
    } else {
      window.location = '/';
    }
  }

  render() {
    let torender = null;

    if (this.props.match.params.options === 'listtrainers') {
      torender = <AllTrainer />;
    } else if (this.props.match.params.options === 'listsubjects') {
      torender = <AllTopics />;
    } else if (this.props.match.params.options === 'listquestions') {
      torender = <AllQuestions />;
    } else if (this.props.match.params.options === 'listtests') {
      torender = <AllTests />;
    } else if (this.props.match.params.options === 'home') {
      torender = <Welcome />;
    } else if (this.props.match.params.options === 'newtest') {
      torender = <NewTest />;
    } else if (this.props.match.params.options === 'conducttest') {
      let params = queryString.parse(this.props.location.search);
      torender = <ConductTest {...params} />;
    } else {
      torender = <ErrorPage />;
    }

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          theme='light'
          collapsed={this.state.collapsed}
          style={{
            overflow: 'hidden',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 5,
          }}
        >
          <div className='logo11' />
          <Menu
            defaultSelectedKeys={[this.props.user.activeRoute]}
            mode='inline'
            theme='light'
          >
            {this.props.user.userOptions.map((d, i) => {
              return (
                <Menu.Item key={i}>
                  <Icon type={d.icon} />
                  <span>{d.display}</span>
                  <Link to={d.link}></Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              position: 'fixed',
              width: '100vw',
              paddingLeft: '10px',
              zIndex: '1000',
              background: '#465d72',
            }}
          >
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ color: '#fff', fontSize: '20px', padding: '20px' }}
            />
            <ul className='user-options-list'>
              <li>
                <Tooltip placement='bottom' title='Log Out'>
                  <Button
                    type='primary'
                    size='large'
                    shape='circle'
                    onClick={this.logOut}
                    className='logout-button'
                  >
                    <Icon type='logout' />
                  </Button>
                </Tooltip>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ padding: '5px', marginTop: 1 }}
                  src={main}
                  alt='company logo'
                  className='d-logo'
                />
              </li>
            </ul>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              marginTop: '80px',
              background: 'rgb(205,217,225)',
              minHeight: '80vh',
              // minHeight: "100vh",
              marginLeft: '95px',
            }}
          >
            <div style={{ width: '100%' }}>{torender}</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  changeActiveRoute,
  login,
  logout,
})(Dashboard);
