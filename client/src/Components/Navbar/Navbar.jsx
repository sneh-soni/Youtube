import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { setCurrentUser } from "../../actions/currentUser";
import Auth from "../../Pages/Auth/Auth";
import logo from "./logo.ico";
import "./Navbar.css";
import SearchBar from "./SearchBar/SearchBar";

function Navbar({ toggleDrawer, setEditCreateChanelBtn }) {
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const [AuthBtn, setAuthBtn] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const googlelogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const onLogOutSuccess = () => {
    dispatch(setCurrentUser(null));
    localStorage.clear();
    googleLogout();
  };

  useEffect(() => {
    if (localStorage.getItem("Profile")) {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      dispatch(login({ email: profile.email }));
    }
  }, [profile, dispatch]);

  useEffect(() => {
    if (CurrentUser) {
      const token = CurrentUser.token;
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) onLogOutSuccess();
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }
  }, [CurrentUser?.token, dispatch]);

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>

          <Link to={"/"} className="logo_div_Navbar">
            <img src={logo} alt="" />
            <p className="logo_title_navbar">YouTube</p>
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        <div className="apps_Box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="Auth_cont_Navbar">
          {CurrentUser ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
                <p className="fstChar_logo_App">
                  {CurrentUser?.result.name ? (
                    <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <p onClick={() => googlelogin()} className="Auth_Btn">
                <BiUserCircle size={22} />
                <b>Sign in</b>
              </p>
            </>
          )}
        </div>
      </div>
      {AuthBtn && (
        <Auth
          setEditCreateChanelBtn={setEditCreateChanelBtn}
          setAuthBtn={setAuthBtn}
          User={CurrentUser}
        />
      )}
    </>
  );
}

export default Navbar;
