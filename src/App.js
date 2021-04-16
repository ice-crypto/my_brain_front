import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, EditFilled, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProblemNew from './problem/new'
import ProblemSolve from './problem/solve'
import ProblemTodaySolve from './problem/today_problems'
import CategoryNew from './category/new'
import BookNew from './book/new'
import CategoryEdit from './category/edit'
import BlogPost from './blog/post'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/">ホーム</Link></Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<EditFilled />} title="問題">
                <Menu.Item key="1">
                  <Link to="/new/problem">新規作成</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/solve/problems">復習</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/solve/today_problems">最近の問題</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<UserOutlined />} title="データ編集">
                <Menu.Item key="2">
                  <Link to="/new/category">新規カテゴリ</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/edit/category">カテゴリ編集</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/new/book">新規書籍</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<UserOutlined />} title="ブログ">
                <Menu.Item key="5">
                  <Link to="/blog/post">新規カテゴリ</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route path="/blog/post">
              <BlogPost/>
            </Route>
            <Route path="/new/problem">
              <ProblemNew/>
            </Route>
            <Route path="/solve/problems">
              <ProblemSolve/>
            </Route>
            <Route path="/solve/today_problems">
              <ProblemTodaySolve/>
            </Route>
            <Route path="/new/category">
              <CategoryNew/>
            </Route>
            <Route path="/edit/category">
              <CategoryEdit/>
            </Route>
            <Route path="/new/book">
              <BookNew/>
            </Route>
             <Route path="/">
               <Content
                 className="site-layout-background"
                 style={{
                   padding: 24,
                   margin: 0,
                   minHeight: 280,
                 }}
               >
                 Content
               </Content>
             </Route>
           </Switch>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App;
