import {Redirect, Route, Switch} from "react-router-dom";
import { Fragment, useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import MailBoxBody from "./Components/Pages/MailBox/MailInbox";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./Components/Store/auth";
import LoginPage from "./Components/Pages/LoginPage/Login";
import PasswordReset from "./Components/Pages/PasswordReset/PasswordReset";

function App(){
  const dispatch = useDispatch();
  const isLogin = useSelector(state=>state.auth.isAuth);
  useEffect(()=>{ dispatch(authActions.checker())},[])
  return (
    <Fragment>
      <NavBar />
      <Switch>
      { isLogin && <Route path="/welcome"> 
          <Welcome />
        </Route>}

        { isLogin && <Route path="/mailbox">
         <MailBoxBody /> 
        </Route>}
        <Route path="/about">
  
        </Route>
        { !isLogin &&<Route path="/auth" >
         <LoginPage />
        </Route>}
        { !isLogin && <Route path="/resetpassword" >
          <PasswordReset />
          </Route>}

        <Route path='*' exact>
          {isLogin && <Redirect to='/mailbox'></Redirect>}
          { !isLogin && <Redirect to='/auth'></Redirect>}
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}
export default App;