import {Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import LoginPage from "./Components/Pages/LoginPage/Login";

function App(){
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/auth">
           <LoginPage />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;