import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchAllChanel } from "./actions/chanelUser";
import { getAllHistory } from "./actions/History";
import { getAlllikedVideo } from "./actions/likedVideo";
import { getAllVideo } from "./actions/video";
import { getAllwatchLater } from "./actions/watchLater";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import DrawerSidebar from "./Components/LeftSidebar/DrawerSidebar";
import Navbar from "./Components/Navbar/Navbar";
import CreateEditChanel from "./Pages/Chanel/CreateEditChanel";
import VideoUpload from "./Pages/VideoUpload/VideoUpload";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChanel());
    dispatch(getAllVideo());
    dispatch(getAlllikedVideo());
    dispatch(getAllwatchLater());
    dispatch(getAllHistory());
  }, [dispatch]);

  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  });

  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setToggleDrawerSidebar({
        display: "flex",
      });
    } else {
      setToggleDrawerSidebar({
        display: "none",
      });
    }
  };

  const [vidUploadPage, setVidUploadPage] = useState(false);
  const [EditCreateChanelBtn, setEditCreateChanelBtn] = useState(false);

  return (
    <Router>
      {vidUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage} />}
      {EditCreateChanelBtn && (
        <CreateEditChanel setEditCreateChanelBtn={setEditCreateChanelBtn} />
      )}
      <Navbar
        setEditCreateChanelBtn={setEditCreateChanelBtn}
        toggleDrawer={toggleDrawer}
      />

      <DrawerSidebar
        toggleDrawer={toggleDrawer}
        toggleDrawerSidebar={toggleDrawerSidebar}
      />

      <AllRoutes
        setVidUploadPage={setVidUploadPage}
        setEditCreateChanelBtn={setEditCreateChanelBtn}
      />
    </Router>
  );
}

export default App;