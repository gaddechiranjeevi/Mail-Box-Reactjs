import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import { authActions } from "../Store/auth";

const NavBar = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const LogOutHandler = (event) => {
        event.preventDefault();
        localStorage.setItem("JWTTOKEN", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("Email", "");
        dispatch(authActions.setAuth(false));
        history.replace('/auth');
    };
    const isLogin = useSelector(state=>state.auth.isAuth);

  return (
    <div className={classes.mainDivv}>
      <div className={classes.subDivvH}>
        <NavLink to="/welcome" className={classes.nammeclass}>
          Home
        </NavLink>
      </div>

      <div className={classes.subDivvP}>
        <NavLink to="/mailbox" className={classes.nammeclass}>
         Mail Box
        </NavLink>
      </div>

      <div className={classes.subDivvA}>
        <NavLink to="/about" className={classes.nammeclass}>
          About us
        </NavLink>
      </div>

    {false && <div className={classes.container}>
        <button className={classes.toggleBtn}>Toggle</button>
    </div> }

      <div className={classes.logoutDiv}>
        <button onClick={LogOutHandler} className={classes.logoutBtn}>
          {isLogin ? "LogOut" : "Login"}
        </button>
      </div>
      <hr className={classes.hrelement}></hr>
    </div>
  );
};

export default NavBar;
