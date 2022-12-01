import {Route, Routes} from "react-router-dom";
import { Fragment } from "react";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Compose from "./Components/Pages/MailBox/Compose";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import LoginPage from "./Components/Pages/LoginPage/Login";

function App(){
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/auth">
           <LoginPage />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/mailbox">
          <Compose />
        </Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}
export default App;