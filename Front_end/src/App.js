import React, {Fragment} from "react"
import AuthService from "./utils/AuthService"
import "./styles/main.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom"
import WelcomePage from "./container/WelcomePage/WelcomePage"
import Login from "./container/LoginPage/Login"
import HomePage from "./container/HomePage/Home"
import SubjectPage from "./container/SubjectPage/Subject"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import EditingSection from "./container/EditingSectionPage/EditingSection"
import AddSection from "./container/addSection/AddSection"
import ReadArticle from "./container/ArticlePage/Article"
import EditPage from "./container/EditArticlePage/EditorPage"
import Search from "./container/SearchPage/search"
import PendingPage from "./container/PendingPage/PendingPage"
import detailedPendingPage from "./container/PendingPage/detailedPendingPage"
import Register from "./container/RegisterPage/Register";
import StudentProfilePage from "./container/ProfilePage/StudentProfilePage"
import ModeratorProfilePage from "./container/ProfilePage/ModeratorProfilePage"
import AddUser from "./container/addUserPage/AddUser"
import CreateArticlePage from "./container/CreateArticlePage/CreateArticlePage"
import Faq from "./container/FAQPage/FAQ"

const AdminRoute = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props =>
        AuthService.userIsAuthenticated() && AuthService.userIsAdmin() ? (
          <Fragment>
            <NavBar {...props}/>
              <div id="page-content">
                <Component {...props} />
              </div>
            <Footer {...props}/>
          </Fragment>
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />  
  )
}

const ModeratorRoute = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props =>
        AuthService.userIsAuthenticated() && AuthService.userIsModerator() ? (
          <Fragment>
            <NavBar {...props}/>
              <div id="page-content">
                <Component {...props} />
              </div>
            <Footer {...props}/>
          </Fragment>
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />  
  )
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.userIsAuthenticated() ? (
          <Fragment>
            <NavBar {...props} />
            <div id="page-content">
              <Component {...props} />
            </div>
            <Footer {...props}/>
          </Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.userIsAuthenticated() ? (
          <Redirect to="/home" />
        ) : (
          <>
            <Component {...props} />
          </>
        )
      }
    />
  )
}

function Subject() {
  const { path, url } = useRouteMatch()
  console.log(path + url)
  return (
    <Switch>
      <PrivateRoute exact path={`${path}/`} component={SubjectPage} />
      <ModeratorRoute path={`${path}/addSection`} component={AddSection} />
      <ModeratorRoute path={`${path}/editLayout`} component={EditingSection}/>
      <PrivateRoute path={`${path}/addSection`} component={AddSection} />
    </Switch>
  )
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={WelcomePage} />
          <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/home" component={HomePage} />
          {/** this is just a placeholder page, loading pages should be done programmatically not hardcoded* */}
          <PrivateRoute path="/faq" component={Faq} />
          <Route path="/subject/:code">
            <Subject />
          </Route>      
          {/* should load based on the response from the backend */}
          <PrivateRoute path="/article/:id" component={ReadArticle} />
          <PrivateRoute path="/editpage/:id" component={EditPage} />
          <PrivateRoute path="/pendingpage/:id" component={PendingPage} />
          <AdminRoute path={`/userPage`} component={AddUser} />
          <PrivateRoute
            path="/detailedpendingpage/:id"
            component={detailedPendingPage}
          />
          {/* //note: Different from EditArticle, EditPage is used to test editor, editArticle was to test readonly */}
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/studentprofile" component={StudentProfilePage}/>
          <PrivateRoute path="/moderatorprofile" component={ModeratorProfilePage}/>
          <PrivateRoute path="/createarticle" component={CreateArticlePage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
