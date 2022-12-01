import {Route, Switch} from "react-router-dom";
import { Fragment } from "react";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import MailBoxBody from "./Components/Pages/MailBox/MailInbox";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import LoginPage from "./Components/Pages/LoginPage/Login";

function App(){
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/auth">
           <LoginPage />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/mailbox">
          <MailBoxBody />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}
export default App;