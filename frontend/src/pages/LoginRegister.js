import React from "react";
import "./LoginRegister.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { clearErrors, login, register } from "../actions/userAction";
// import Loader from "../layout/loader/Loader";
// import MetaData from "../layout/MetaData";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isAuthenticated, success } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const { name, email, password, gender } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      alert.error("Name is required!");
      return;
    } else if (email === "") {
      alert.error("Email is required!");
      return;
    } else if (password === "") {
      alert.error("Password is required !");
      return;
    } else if (gender === "") {
      alert.error("Gender is required !");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("gender", gender);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("User registered successfully please login to proceed");
      navigate("/");
      setUser({
        name: "",
        email: "",
        password: "",
        gender: "",
      });
    }

    if (isAuthenticated) {
      navigate("/users");
    }

    // setTimeout(() => {
    //   setShowSpinner(false);
    // }, 1200);
  }, [dispatch, error, alert, isAuthenticated, navigate, success]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div>
              <Link to="/users" className="loginButton">
                <input type="submit" value="Login" className="loginBtn" />
              </Link>
            </div>
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <div className="gender">
                <span>Gender:</span>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={registerDataChange}
                />
                <label className="labelGender" for="gender">
                  Male
                </label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="Female"
                  onChange={registerDataChange}
                />
                <label className="labelGender" for="male">
                  Female
                </label>
              </div>
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
